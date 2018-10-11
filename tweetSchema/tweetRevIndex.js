const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const anmolPaginate = require('../paginateFunction');

const revIndexSchema = new Schema({
	key:{
		type: String,index: true
	},
	tweetId: [{type: mongoose.Schema.Types.ObjectId, ref: 'tweet'}]
})

revIndexSchema.plugin(anmolPaginate)

const RevIndex = mongoose.model('rev', revIndexSchema);

module.exports = RevIndex;