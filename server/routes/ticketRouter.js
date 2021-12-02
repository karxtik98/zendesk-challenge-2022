const express = require("express");
const ticketController = require("../controllers/ticketController");
const ticketRouter = express.Router();

ticketRouter.get("/", ticketController.getAllTickets);
ticketRouter.get("/:id", ticketController.getTicketById);

module.exports = ticketRouter;
