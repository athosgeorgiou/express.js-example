const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const MessageModel = require("./models/messageModel");
const MessageController = require("./controllers/messageController");

describe("MessageController", () => {
  describe("createMessage", () => {
    it("should return status 201 and a new message object", async () => {
      const message = "Hello, world!";
      const req = { body: { message } };
      const res = { status: sinon.stub().returnsThis(), json: sinon.spy() };

      const createMessageStub = sinon
        .stub(MessageModel, "createMessage")
        .returns({ id: 1, message });

      MessageController.createMessage(req, res);

      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ id: 1, message })).to.be.true;

      createMessageStub.restore();
    });

    it("should return status 400 if message is not provided", async () => {
      const req = { body: {} };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      MessageController.createMessage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith("Message is required")).to.be.true;
    });
  });

  describe("updateMessage", () => {
    it("should return status 200 and the updated message object if it exists", async () => {
      const id = 1;
      const message = "Hello, world!";
      const req = { params: { id }, body: { message } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
        send: sinon.spy(),
      };

      const updateMessageByIdStub = sinon
        .stub(MessageModel, "updateMessageById")
        .returns({ id, message });

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ id, message })).to.be.true;

      updateMessageByIdStub.restore();
    });

    it("should return status 404 if the message does not exist", async () => {
      const id = 1;
      const message = "Hello, world!";
      const req = { params: { id }, body: { message } };
      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
        send: sinon.spy(),
      };

      const updateMessageByIdStub = sinon
        .stub(MessageModel, "updateMessageById")
        .returns(null);

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.send.calledWith(`Message with id ${id} not found`)).to.be.true;

      updateMessageByIdStub.restore();
    });

    it("should return status 400 if message is not provided", async () => {
      const id = 1;
      const req = { params: { id }, body: {} };
      const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };

      MessageController.updateMessage(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.send.calledWith("Message is required")).to.be.true;
    });
  });
});
