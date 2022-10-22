const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const User = require("../models/userModels");

//@desc Get user ticket
//@route GET /api/tickets
//@access Private
const getTickets = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const tickets = await Ticket.find({ user: req.user.id });
  res.status(200).json(tickets);
});

//@desc create ticket
//@route POST/api/tickets
//@access Private
const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;
  if (!product || !description) {
    res.status(400);
    throw new Error("please add product and description");
  }
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new",
  });
  res.status(201).json(ticket);
});
//@desc Get user ticket
//@route GET /api/ticket:id
//@access Private
const getTicket = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  res.status(200).json(ticket);
});

//@desc Delete user ticket
//@route DELETE /api/tickets
//@access Private
const deleteTicket = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const ticket = await Ticket.findById(req.params.id);
  if (!ticket) {
    res.status(401);
    throw new Error("Ticket not found");
  }
  await ticket.remove();
  res.status(200).json({ success: true });
});

//@desc Update ticket
//@route PUT /api/tickets
//@access Private
const updateTicket = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
