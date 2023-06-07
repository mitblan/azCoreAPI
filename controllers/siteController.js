//=============================================================================
// AzerothCoreAPI
// siteController.js
// www.azerothcore.org
// Written by Mitchell Blankenship
//=============================================================================

//=============================================================================
// Dependencies
//=============================================================================
import Realmlist from "../models/realmlistModel.js"
import Uptime from "../models/uptimeModel.js"
import Character from "../models/characterModel.js"
import asyncHandler from "express-async-handler"
import { uptimeCalculation, dateFromTimestamp } from "../utils/utility.js"

//=============================================================================
// @desc    Get server status
// @route   GET /api/status
// @access  Public
//=============================================================================
const getStatus = asyncHandler( async ( req, res ) => {
  const {id, name} = await Realmlist.findOne()
  const uptime = await Uptime.findOne( {
    where: {realmid: id},
    order: [ [ 'starttime', 'DESC' ] ]
  } )

  const chars = await Character.findAll( { where: { online: 1 } } )

  const { count } = await Character.findAndCountAll( { where: { online: 1 } } )

  const realmUptime = uptimeCalculation( uptime.uptime )
  const startTime = dateFromTimestamp( uptime.starttime )
  const realmStatus = {
    uptime: realmUptime,
    revision: uptime.revision,
    startTime: startTime,
    online: count,
    realmName: name,
    onlineChars: chars
  }

  if ( realmStatus ) {
    res.status( 200 ).json( realmStatus )
  } else {
    res.status( 404 )
    throw new Error( "Status not available" )
  }
} )

export { getStatus }