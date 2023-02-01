/** @format */

const express = require("express");
const router = express.Router();
const {
  getGoal,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const {protect} = require('../middleware/authMiddleware')

router.get("/", protect,getGoal);
router.post("/", protect,setGoal);
router.put("/:id",protect, updateGoal);
router.delete("/:id", protect,deleteGoal);

module.exports = router;
