/** @format */
const asyncHandler = require('express-async-handler')

const getGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: " Get Goals - Controller" });
})

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
})
const updateGoal =asyncHandler( async (req, res) => {
  res.status(200).json({ message: `Update Goals ${req.params.id}` });
})
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goals ${req.params.id}` });
})

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};
