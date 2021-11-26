const _AdminChatCollection = require('../models/AdminChatModel');
const _UserChatCollection = require('../models/UserChatModel');

const SendMessageToUser = async (req,res) => {
    try {
        const _MessageFromAdmin = req.body.Message;
        const _MessageToSaveForUser = new _UserChatCollection({
            Message: _MessageFromAdmin
        })
        const _Result = await _MessageToSaveForUser.save();
        res.json({
            Message:'Message Has Sent Successfully',
            Data: true,
            Result: _Result,
        })
    } catch (error) {
        res.json({
            Message:error.Message,
            Data: false,
            Result: null,
        })
    }
}

const SendMessageToAdmin = async (req,res) => {
    try {
        const _MessageFromUser = req.body.Message;
        const _MessageToSaveForAdmin = new _AdminChatCollection({
            Message: _MessageFromUser
        })
        const _Result = await _MessageToSaveForAdmin.save();
        res.json({
            Message:'Message Has Sent Successfully',
            Data: true,
            Result: _Result,
        })
    } catch (error) {
        res.json({
            Message:error.Message,
            Data: false,
            Result: null,
        })
    }
}

const GetMessageFromAdmin = async (req,res) => {
    try {
        const GetAllMessages = await _AdminChatCollection.find();
        res.json({
            Message:'Found Successfully',
            Data:true,
            Result:GetAllMessages
        })
    } catch (error) {
        res.json({
            Message:error.Message,
            Data: false,
            Result: null,
        })
    }
}

const GetMessageFromUser = async (req,res) => {
    try {
        const GetAllMessages = await _UserChatCollection.find();
        res.json({
            Message:'Found Successfully',
            Data:true,
            Result:GetAllMessages
        })
    } catch (error) {
        res.json({
            Message:error.Message,
            Data: false,
            Result: null,
        })
    }
}

module.exports = { SendMessageToAdmin, SendMessageToUser, GetMessageFromAdmin, GetMessageFromUser };