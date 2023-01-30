/** @format */
const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");

// const getGoal = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: " Get Goals - Controller" });
// })
const getGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.find();
  res.status(200).json(goal);
});

const setGoal = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: " Set Goals" });
  console.log(req.body);
  // if (!req.body.text) {
  //   res.status(400).json({ message: "please fill in  value in text field" });
  // }
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text filed (value missing)");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });
  res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found in list");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id)
  if(!goal){
    res.status(400);
    throw new error('Goal not found to be deleted')
  }
  // const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
  await goal.remove()
  res.status(200).json({id: req.params.id });

  // res.status(200).json(deleteGoal)
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
