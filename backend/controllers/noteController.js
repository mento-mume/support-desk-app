const asyncHandler = require("express-async-handler");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");
const User = require("../models/userModels");

//@desc Get ticket note
//@route GET /api/tickets/:ticketId/notes
//@access Private
const getNotes = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  //check if ticket belongs to logged in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

//create norte
const addNote = asyncHandler(async (req, res) => {
  //get user id from the JWT
  const user = await User.findById(req.user.id);

  // if not user
  if (!user) {
    res.status(401);
    throw new Error("user not authorized");
  }
  const ticket = await Ticket.findById(req.params.ticketId);
  //check if ticket belongs to logged in user
  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //create note
  const note = await Note.create({
    user: req.user.id,
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
  });
  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote,
};
