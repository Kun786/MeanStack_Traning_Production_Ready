const mongoose = require('mongoose');

const _AdminChatSchema = mongoose.Schema({
   Message:{ type:String }
})

module.exports = mongoose.model('AdminChat', _AdminChatSchema);