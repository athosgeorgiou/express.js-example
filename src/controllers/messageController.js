// controllers/messageController.js

const MessageModel = require("../models/messageModel");

class MessageController {
  static getGreeting(req, res) {
    res.status(200).send("Hello, world!");
  }

  static createMessage(req, res) {
    const { message } = req.body;
    if (!message) {
      res.status(400).send("Message is required");
      return;
    }
    const newMessage = MessageModel.createMessage(message);
    res.status(201).json(newMessage);
  }

  static updateMessage(req, res) {
    const { id } = req.params;
    const { message } = req.body;
    if (!message) {
      res.status(400).send("Message is required");
      return;
    }
    const updatedMessage = MessageModel.updateMessageById(id, message);
    if (updatedMessage) {
      res.status(200).json(updatedMessage);
    } else {
      res.status(404).send(`Message with id ${id} not found`);
    }
  }

  static getAllMessages(req, res) {
    res.status(200).send(MessageModel.getAllMessages());
  }
}

module.exports = MessageController;
