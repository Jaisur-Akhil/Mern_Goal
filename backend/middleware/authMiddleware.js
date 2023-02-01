/** @format */

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");

// const protect = asyncHandler(async (req, res, next) => {
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       token = req.headers.authorization.split(" ")[1];
//       const decoded = jwt.verify(token, "abc123");
//       req.user = await User.findById(decoded.id).select("-password");
//       next();
//     } catch (error) {
//       console.log(error);
//       res.status(401);
//       throw new Error("Not authorised");
//     }
//   }
//   if (!token) {
//     res.status(401);
//     throw new Error("Not authorised, no token");
//   }
// });
const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
        // get token from header
        token = req.headers.authorization.split(' ')[1]

        //verify
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        //get user from the token from payload
        req.user = await User.findById(decoded.id).select('-password')
        next()
    } catch (error) {
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
  }
});

module.exports = { protect };
