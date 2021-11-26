const mongoose = require('mongoose');

const _UserChatSchema = mongoose.Schema({
   Message:{ type:String }
})

module.exports = mongoose.model('UserChat', _UserChatSchema);