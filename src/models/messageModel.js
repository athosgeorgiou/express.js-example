// models/messageModel.js

let messages = [];

class MessageModel {
  static deleteAllMessages() {
    messages = [];
  }

  static getMessageLength() {
    return messages.length;
  }

  static getAllMessages() {
    return messages;
  }

  static getMessageById(id) {
    return messages.find((message) => message.id === id);
  }

  static createMessage(message) {
    const newMessage = { id: Date.now(), message };
    messages.push(newMessage);
    return newMessage;
  }

  static updateMessageById(id, updatedMessage) {
    const index = messages.findIndex((message) => message.id === id);
    if (index !== -1) {
      messages[index].message = updatedMessage;
      return messages[index];
    }
    return null;
  }

  static deleteMessageById(id) {
    const index = messages.findIndex((message) => message.id === id);
    if (index !== -1) {
      messages.splice(index, 1);
      return true;
    }
    return false;
  }
}

module.exports = MessageModel;
