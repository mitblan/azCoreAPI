//=============================================================================
// AzerothCoreAPI
// userController.js
// www.azerothcore.org
// Written by Mitchell Blankenship
//=============================================================================

//=============================================================================
// Dependencies
//=============================================================================
import cryto from 'crypto'
import { Op } from 'sequelize'
import { computeVerifier, params } from '@azerothcore/ac-nodejs-srp6'
import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Account from '../models/accountModel.js'
import Character from '../models/characterModel.js'

//=============================================================================
// @desc:   Get a list of all users
// @route:  GET /api/users
// @access: Private/Staff
//=============================================================================
const getUsers = asyncHandler( async ( req, res ) => { 
  const users = await User.findAll( {
    attributes: { exclude: [ 'password' ] },
  } )
  res.json( users )
} )

//=============================================================================
// @desc:   Login a user
// @route:  POST /api/users/login
// @access: Public
//=============================================================================
const authUser = asyncHandler( async ( req, res ) => { 
  // Destructure the request body
  const { email, password } = req.body
  
  // Find the user by email
  const user = await User.findOne( { where: { email } } )

  // If the user exists and the password matches, generate a token and send it
  if ( user && ( await user.matchPassword( password ) ) ) {
    generateToken(res, user.id)
    res.json( {
      id: user.id,
      username: user.username,
      email: user.email,
      account_id: user.account_id,
    } )
  } else { 
    res.status( 401 )
    throw new Error( 'Invalid email or password' )
  }

} )

//=============================================================================
// @desc:   Logout a user
// @route:  POST /api/users/logout
// @access: Private
//=============================================================================
const logoutUser = asyncHandler( async ( req, res ) => { 
  // Clear the cookie
  res.cookie('azcoreInfo', null, {
    httpOnly: true,
    expires: new Date( 0 ),
  })
  res.json( { message: 'Logged out successfully' } )

} )

//=============================================================================
// @desc:   Register a new user and create a server account
// @route:  POST /api/users
// @access: Public
//=============================================================================
const registerUser = asyncHandler( async ( req, res ) => { 
  // Destructure the request body
  const { email, username, password } = req.body

  // Generate a random salt
  const salt = cryto.randomBytes( 32 )
  
  // Check if the user already exists in the database
  let userExists = await User.findOne( { where: { [ Op.or ]: [ { username }, { email } ] } } )
  
  // If the user doesn't exist, check if the account exists
  if ( !userExists ) { 
    userExists = await Account.findOne( { where: { [ Op.or ]: [ { username }, { reg_mail: email } ] } } )
  } 

  // If the user or account exists, throw an error
  if ( userExists ) {
    res.status( 400 )
    throw new Error( 'Username or Email already exists.' )
  }

  // Compute the verifier
  const verifier = await computeVerifier( params.constants, salt, username.toUpperCase(), password.toUpperCase() )

  // Create the account
  const account = await Account.create( { username, salt, verifier, email, reg_mail: email } )

  // If the account is created, create the user
  if ( account ) {
    const user = await User.create( { username, email, password, account_id: account.id } )
    if ( user ) {
      generateToken(res, user.id)
      res.status( 201 ).json( { message: 'User created successfully' } )
    } else {
      res.status( 400 )
      throw new Error( 'Invalid user data' )
    }
  } else {
    res.status( 400 )
    throw new Error( 'Invalid user data' )
  }
  
  
} )

//=============================================================================
// @desc:   Get a user's profile
// @route:  GET /api/users/profile
// @access: Private
//=============================================================================
const getProfile = asyncHandler( async ( req, res ) => { 
  console.log(req.user)
  // Find the user by id
  const user = await User.findByPk( req.user.id, { attributes: { exclude: [ 'password' ] } } )

  // Get the users Account
  const account = await Account.findByPk( user.account_id )

  // Get the users characters
  const characters = await Character.findAll( { where: { account: user.account_id } } )

  // If the user and account exist, send the response
  if ( user && account ) {
    res.json({user, account, characters})
  } else {
    res.status( 404 )
    throw new Error( 'User not found' )
  }
} )
 
export { getUsers, registerUser, authUser, logoutUser, getProfile}