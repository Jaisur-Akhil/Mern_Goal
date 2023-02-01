/** @format */
const asyncHandler = require("express-async-handler");

const Goal = require("../model/goalModel");
const User = require("../model/userModel");

// const getGoal = asyncHandler(async (req, res) => {
//   res.status(200).json({ message: " Get Goals - Controller" });
// })
const getGoal = asyncHandler(async (req, res) => {
  console.log(req, "i ma req");
  const goal = await Goal.find({ user: req.user.id });
  res.status(200).json(goal);
});

const setGoal = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: " Set Goals" });
  // console.log(req.body);
  // if (!req.body.text) {
  //   res.status(400).json({ message: "please fill in  value in text field" });
  // }
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text filed (value missing)");
  }

  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });
  res.status(200).json(goal);
});
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error("Goal not found in list");
  }
  const user = await User.findById(req.user.id);
  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
  //goal us updated for respective owernrer of thegoal and not others goal
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not Authorized");
  }
  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new error("Goal not found to be deleted");
  }

  const user = await User.find(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  // const deleteGoal = await Goal.findByIdAndDelete(req.params.id)
  await goal.remove();
  res
    .status(200)
    .json({ id: req.params.id, message: "Goal deleted successfully" });

  // res.status(200).json(deleteGoal)
});

module.exports = {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
};


// /63da02b630ce13588f1999a0 ram id for goal
// ram@ayodhya.com Ramayan -63d8f475439c0565afb029e1
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDhmNDc1NDM5YzA1NjVhZmIwMjllMSIsImlhdCI6MTY3NTIzMjc0NSwiZXhwIjoxNjc3ODI0NzQ1fQ.FtYpwbVFOKFval5mVUBGWdnchEGoPwHTNmdpI4Psy9A
// delete this 


// krishna@Puri.com Bhagwatgeeta -63d93667fc1574bea9e0a11a
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDkzNjY3ZmMxNTc0YmVhOWUwYTExYSIsImlhdCI6MTY3NTIzMjk3NywiZXhwIjoxNjc3ODI0OTc3fQ.t2O9vng95P_06vAeOQNBQZCU3tj8hRk1-UbPGT-5kcQ
//Back to back projects -63d9fed530ce13588f199988
//Calm brain is needed - 63d9ff8f30ce13588f19998d

// vishnu@brahamand.com world