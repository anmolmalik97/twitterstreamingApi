const express = require('express');
const router = express.Router();
const Json2csvParser = require('json2csv').Parser;
const app = require('../../server')


router.get('/',(req,res) => {
	if(app.locals.filteredData){
		const fields = ['id_str','text','user.name','user.screen_name','user.location','user.followers_count','user.lang','retweet_count','favourite_count','lang','user.description'];
		let data = app.locals.filteredData;
		const json2csvParser = new Json2csvParser({ fields });
		const csv = json2csvParser.parse(data);
		res.attachment('filename.csv');
		res.status(200).send(csv);
	}else{
		res.statusCode = 300;
		res.json({
			message: 'bad req'
		})
	}
})

module.exports = router