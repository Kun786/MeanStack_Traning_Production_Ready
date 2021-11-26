const expres = require('express');
const Router = expres.Router();


//Calling controlers
const { SendMessageToAdmin, SendMessageToUser, GetMessageFromAdmin, GetMessageFromUser } = require ('../controllers/ChatController');
//Calling controlers

Router.post('/SendMessageToAdmin',SendMessageToAdmin);
Router.post('/SendMessageToUser',SendMessageToUser);
Router.get('/GetMessageFromAdmin',GetMessageFromAdmin);
Router.get('/GetMessageFromUser',GetMessageFromUser);

module.exports = Router;