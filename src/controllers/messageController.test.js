const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

const MessageModel = require("../models/messageModel");
const MessageController = require("../controllers/messageController");

describe("MessageController", () => {
  describe("createMessage", () => {
    it("should create a new message and return it as JSON", () => {
      const req = { body: { message: "Hello, world!" } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(MessageModel, "createMessage").returns({
        id: 1,
        message: "Hello, world!",
      });

      MessageController.createMessage(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1, message: "Hello, world!" })).to.be
        .true;

      MessageModel.createMessage.restore();
    });

    it("should return a 400 status if message is missing", () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      MessageController.createMessage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith("Message is required")).to.be.true;
    });
  });

  describe("updateMessage", () => {
    it("should update an existing message and return it as JSON", () => {
      const req = { params: { id: 1 }, body: { message: "Hello, world!" } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      sinon.stub(MessageModel, "updateMessageById").returns({
        id: 1,
        message: "Hello, world!",
      });

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ id: 1, message: "Hello, world!" })).to.be
        .true;

      MessageModel.updateMessageById.restore();
    });

    it("should return a 404 status if message with the given ID does not exist", () => {
      const req = { params: { id: 1 }, body: { message: "Hello, world!" } };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      sinon.stub(MessageModel, "updateMessageById").returns(null);

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith("Message with id 1 not found")).to.be.true;

      MessageModel.updateMessageById.restore();
    });

    it("should return a 400 status if message is missing", () => {
      const req = { params: { id: 1 }, body: {} };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith("Message is required")).to.be.true;
    });
  });

  describe("getGreeting", () => {
    it("should return 'Hello, world!' as plain text", () => {
      const req = {};
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      MessageController.getGreeting(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith("Hello, world!")).to.be.true;
    });
  });

  describe("getAllMessages", () => {
    it("should send all messages in response body", () => {
      const getAllMessagesSpy = sinon.spy(MessageModel, "getAllMessages");

      const req = {};
      const res = {
        status: sinon.stub().returnsThis(),
        send: sinon.spy(),
      };

      MessageController.getAllMessages(req, res);
      expect(getAllMessagesSpy.calledOnce).to.be.true;
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.send.calledWith(MessageModel.getAllMessages())).to.be.true;
      getAllMessagesSpy.restore();
    });
  });
});
