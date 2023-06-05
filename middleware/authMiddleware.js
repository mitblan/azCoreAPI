import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import dotenv from 'dotenv'
dotenv.config()

// User must be authenticated
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from the 'azcoreInfo' cookie
  token = req.cookies.azcoreInfo;

  if (token) {
    try {
      const decoded = jwt.verify( token, process.env.APP_SECRET );

      req.user = await User.findByPk( decoded.userId, { attributes: { exclude: [ 'password' ] } } )

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// User must be an admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as an admin');
  }
};

export { protect, admin };
