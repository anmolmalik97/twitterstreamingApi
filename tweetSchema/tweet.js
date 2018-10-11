const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
	created_at: {
		type: Date,
		index: true
	},
	id_str:{
		type: String
	},
	text:{
		type: String,
	},
	source:{
		type: String
	},
	in_reply_to_status_id_str:{
		type: String
	},
	in_reply_to_user_id_str:{
		type: String
	},
	in_reply_to_screen_name:{
		type: String
	},
	user:{
		id_str:{
			type: String
		},
		name:{
			type: String,
			index: true,
		},
		screen_name:{
			type: String,
			index: true
		},
		location:{
			type: String
		},
		url:{
			type: String
		},
		description:{
			type: String
		},
		protected:{
			type: Boolean
		},
		verified:{
			type: Boolean
		},
		followers_count:{
			type: Number
		},
		friends_count:{
			type: Number
		},
		listed_count:{
			type: Number
		},
		favourites_count:{
			type: Number
		},
		statuses_count:{
			type: Number
		},
		created_at:{
			type: Date
		},
		lang:{
			type: String
		}
	},
	extended_tweet:{
		full_text:{
			type: String
		}
	},
	quote_count:{
		type: Number
	},
	reply_count:{
		type: Number
	},
	retweet_count:{
		type: Number
	},
	favorite_count:{
		type: Number
	},
	entities:{
		urls:[
			{
				url:{
					type: String
				},
			}
		],
		user_mentions:[
			{
				name:{
					type: String
				}
			}
		]
	},
	favorite:{
		type: Boolean
	},
	retweeted:{
		type: Boolean
	},
	lang:{
		type: String
	}


}, {"strict": true});

tweetSchema.plugin(mongoosePaginate)

const Tweet = mongoose.model('tweet', tweetSchema);


module.exports = Tweet;