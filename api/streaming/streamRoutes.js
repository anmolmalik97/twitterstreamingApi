const express = require('express');
const router = express.Router();
const config = require('./streamConfig')

router.post('/start',(req,res,next) => {
 	let term = req.body.term;
    const searchTerm = term;
    if(config.twitterStream != null)
    	config.twitterStream.stop();
    config.streamT();
    res.statusCode = 200;
    res.json({
		message: 'stream started'
	})
})

router.post('/stop', (req, res) => {
		if(!config.twitterStream){
			res.statusCode = 404;
			res.json({
			message: 'no stream exist'
		})
		}
        config.twitterStream.stop();
        res.statusCode = 200;
	    res.json({
			message: 'stream stoped'
		})
    });

module.exports = router;