const express = require('express');
const router = express.Router();
const soundex = require('soundex-code')
const app = require('../../server')

const RevIndex = require('../../tweetSchema/tweetRevIndex.js')
const Tweet = require('../../tweetSchema/tweet.js')


router.get('/',(req,res,next) => {
	let startDate = req.query.startDate ? req.query.startDate : new Date(2010,1,1)
		let endDate = req.query.endDate ? req.query.endDate : new Date()
		let sort = req.query.sort ? req.query.sort : 1;
		let rtCountMax = req.query.rtCountMax ? req.query.rtCountMax : 1000000000000000000000;
		let rtCountMin = req.query.rtCountMin ? req.query.rtCountMin : 0;
		let favCountMax = req.query.favCountMax ? req.query.favCountMax : 10000000000000000000000000000000000000000;
		let favCountMin = req.query.favCountMin ? req.query.favCountMin : 0;
		let language = req.query.language ? req.query.language : 'en';
		let followersCountMax = req.query.followersCountMax ? req.query.followersCountMax : 100000000000000000000000000;
		let followersCountMin = req.query.followersCountMin ? req.query.followersCountMin : 0;
		let verified = req.query.verified ? req.query.verified : false;
		let nameStartsWith = '[\s\S]*'
		let options = {
			sort: {
				created_at: sort
			},
			page: parseInt(req.query.page,10) || 1,
			limit: parseInt(req.query.perPage,10) || 10,
			startDate: startDate,
			endDate: endDate,
			rtCountMin: rtCountMin,
			rtCountMax: rtCountMax,
			favCountMax: favCountMax,
			favCountMin: favCountMin,
			language: language,
			key: req.query.text || ' ',
			followersCountMin: followersCountMin,
			followersCountMax: followersCountMax,
			verified: verified,
		}
	if(req.query.user){
		let searchTerm = req.query.user;
		let query = {
				"user.name": searchTerm,
				created_at: {
				"$gte": startDate,
					"$lte": endDate
				},
				retweet_count:{
					"$gte": rtCountMin,
					"$lte": rtCountMax
				},
				"user.followers_count":{
					"$gte": followersCountMin,
					"$lte": followersCountMax
				},
				"user.favourites_count":{
					"$gte": favCountMin,
					"$lte": favCountMax
				},
				lang: language,
				"user.verified": verified,
				}
		Tweet.paginate(query,options)
		.then(data => {
			console.log(app)
			app.locals.filteredData = data.docs;
			res.statusCode = 200;
			res.json(data);
		},err => next(err))
		.catch((err) => next(err));
	}
	else if(req.query.screenName){
		let searchTerm = req.query.screenName;
		let query = {
				"user.screen_name": searchTerm,
				created_at: {
				"$gte": startDate,
					"$lte": endDate
				},
				retweet_count:{
					"$gte": rtCountMin,
					"$lte": rtCountMax
				},
				"user.followers_count":{
					"$gte": followersCountMin,
					"$lte": followersCountMax
				},
				"user.favourites_count":{
					"$gte": favCountMin,
					"$lte": favCountMax
				},
				lang: language,
				"user.verified": verified,
				}
		Tweet.paginate(query,options)
		.then(data => {
			app.locals.filteredData = data.docs;
			console.log(app)
			res.statusCode = 200;
			res.json(data)
		},err => next(err))
		.catch((err) => next(err));
	}
	else if (req.query.text){
		let searchTerm = req.query.text;
		let query = {
			key: soundex(searchTerm),
		}
		RevIndex.anmolPaginate(query,options)
		.then(data => {
			if(!data){
				res.statusCode = 404;
				res.json({
					error: 'nothing found'
				})
			}
			else{
				app.locals.filteredData = data.docs;
				res.statusCode = 200;
				res.json(data)
			}
		},err => next(err))
		.catch((err) => next(err));

		
	}
	else{
		res.statusCode = 404;
		res.json({
			message: 'invalid query'
		})
	}
})

module.exports = router