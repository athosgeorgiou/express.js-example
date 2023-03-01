const chai = require("chai");
const MessageModel = require("../models/messageModel");

const expect = chai.expect;

describe("MessageModel", () => {
  beforeEach(() => {
    MessageModel.deleteAllMessages();
  });

  describe("createMessage", () => {
    it("should create a new message", () => {
      const message = "Hello, world!";
      const newMessage = MessageModel.createMessage(message);

      expect(newMessage.id).to.be.a("number");
      expect(newMessage.message).to.equal(message);
      expect(MessageModel.getMessageLength()).to.equal(1);
      expect(MessageModel.getMessageById(newMessage.id)).to.equal(newMessage);
    });
  });

  describe("updateMessageById", () => {
    it("should update an existing message", () => {
      const message = "Hello, world!";
      const updatedMessage = "Hello, universe!";
      const newMessage = MessageModel.createMessage(message);

      const result = MessageModel.updateMessageById(
        newMessage.id,
        updatedMessage
      );

      expect(result).to.equal(newMessage);
      expect(MessageModel.getMessageLength()).to.equal(1);
      expect(MessageModel.getMessageById(newMessage.id).message).to.equal(
        updatedMessage
      );
    });

    it("should return null if message with specified id does not exist", () => {
      const updatedMessage = "Hello, universe!";

      const result = MessageModel.updateMessageById(123, updatedMessage);

      expect(result).to.be.null;
      expect(MessageModel.getMessageLength()).to.equal(0);
    });
  });

  describe("deleteMessageById", () => {
    it("should delete an existing message", () => {
      const message = "Hello, world!";
      const newMessage = MessageModel.createMessage(message);

      const result = MessageModel.deleteMessageById(newMessage.id);

      expect(result).to.be.true;
      expect(MessageModel.getMessageLength()).to.equal(0);
    });

    it("should return false if message with specified id does not exist", () => {
      const result = MessageModel.deleteMessageById(123);

      expect(result).to.be.false;
      expect(MessageModel.getMessageLength()).to.equal(0);
    });
  });
});
