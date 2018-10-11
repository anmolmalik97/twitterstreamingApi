var Promise = require('bluebird');
var soundex = require('soundex-code')


 function limitAnmol(c){
    return this.filter((x,i)=>{
        if(i<=(c-1))
        {return true}
    })
 }

 Array.prototype.limitAnmol=limitAnmol

 function skipAnmol(c){
    return this.filter((x,i)=>{
        if(i>(c-1))
            {return true}
    })
}

Array.prototype.skipAnmol=skipAnmol;


async function paginate(query, options, callback) {
    query   = query || {};
    options = Object.assign({}, paginate.options, options);

    var select     = options.select;
    var sort       = options.sort;
    var populate   = options.populate;
    var lean       = options.lean || false;
    var leanWithId = options.hasOwnProperty('leanWithId') ? options.leanWithId : true;

    var limit = options.hasOwnProperty('limit') ? options.limit : 10;
    var skip, offset, page,countTweets;
    let count;

    if (options.hasOwnProperty('offset')) {
        offset = options.offset;
        skip   = offset;
    } else if (options.hasOwnProperty('page')) {
        page = options.page;
        skip = (page - 1) * limit;
    } else {
        offset = 0;
        page   = 1;
        skip   = offset;
    }

    var promises = {
        docs:  Promise.resolve([]),
        // count: this.count(query).exec()
    };

 await this.find(query)
   .populate({
        path: 'tweetId',
        match:{
            created_at: {
                "$gte": options.startDate,
                "$lte": options.endDate
            },
            retweet_count:{
                "$gte": options.rtCountMin,
                "$lte": options.rtCountMax
            },
            "user.followers_count":{
                "$gte": options.followersCountMin,
                "$lte": options.followersCountMax
            },
            "user.favourites_count":{
                "$gte": options.favCountMin,
                "$lte": options.favCountMax
            },
            lang: options.language,
            "user.verified": options.verified,
        },
   })
   .then(data=> {
    countTweets = data[0].tweetId.length
   })

    if (limit) {
        var query = this.find(query)
                        // .select(select)

        if (1) {
            query.populate({
                path: 'tweetId',
                match:{
                    created_at: {
                        "$gte": options.startDate,
                        "$lte": options.endDate
                    },
                    retweet_count:{
                        "$gte": options.rtCountMin,
                        "$lte": options.rtCountMax
                    },
                    "user.followers_count":{
                        "$gte": options.followersCountMin,
                        "$lte": options.followersCountMax
                    },
                    "user.favourites_count":{
                        "$gte": options.favCountMin,
                        "$lte": options.favCountMax
                    },
                    lang: options.language,
                    "user.verified": options.verified,
                   
                },
                options:{
                }

        })

        promises.docs = query.exec();

        if (lean && leanWithId) {
            promises.docs = promises.docs.then(function(docs) {
                docs.forEach(function(doc) {
                    doc.id = String(doc._id);
                });

                return docs;
            });
        }
    }
}

    return Promise.props(promises)
        .then(function(data) {
            if(skip>0){
             data.docs[0].tweetId = data.docs[0].tweetId.skipAnmol(skip)
            }
            data.docs[0].tweetId = data.docs[0].tweetId.limitAnmol(limit)
           var result = {
                docs:  data.docs[0].tweetId,
                total: countTweets,
                limit: limit,
                currentPageTotal: data.docs[0].tweetId.length
            };

            if (offset !== undefined) {
                result.offset = offset;
            }

            if (page !== undefined) {
                result.page  = page;
                result.pages = Math.ceil(countTweets / limit) || 1;
            }

            return result;
        })
        .asCallback(callback);
}

/**
 * @param {Schema} schema
 */
module.exports = function(schema) {
    schema.statics.anmolPaginate = paginate;
};

module.exports.anmolPaginate = paginate;