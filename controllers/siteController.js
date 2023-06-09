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
import Character2 from "../models/character2Model.js"
import asyncHandler from "express-async-handler"
import { uptimeCalculation, dateFromTimestamp } from "../utils/utility.js"

//=============================================================================
// @desc    Get server status
// @route   GET /api/status
// @access  Public
//=============================================================================
const getStatus = asyncHandler( async ( req, res ) => {
    // Realm 1 Status
    const realm1 = await Realmlist.findOne( { where: { id: 1 } } )
    const realm1Uptime = await Uptime.findOne( {
      where: { realmid: 1 },
      order: [ [ 'starttime', 'DESC' ] ]
    } )

  const realm1Chars = await Character.findAndCountAll( { where: { online: 1 } } )

    const realmUptime1 = uptimeCalculation( realm1Uptime.uptime )
    const startTime1 = dateFromTimestamp( realm1Uptime.starttime )
    const realmStatus1 = {
        realmName: realm1.name,
        uptime: realmUptime1,
        startTime: startTime1,
        revision: realm1Uptime.revision,
        online: realm1Chars.count,
        onlineChars: realm1.rows
    }
  
    // Realm 2 Status
    const realm2 = await Realmlist.findOne( { where: { id: 2 } } )
    const realm2Uptime = await Uptime.findOne( {
      where: { realmid: 2 },
      order: [ [ 'starttime', 'DESC' ] ]
    } )

    const realm2Chars = await Character.findAndCountAll( { where: { online: 2 } } )

    const realmUptime2 = uptimeCalculation( realm2Uptime.uptime )
    const startTime2 = dateFromTimestamp( realm2Uptime.starttime )
    const realmStatus2 = {
        uptime: realmUptime2,
        revision: realm2Uptime.revision,
        startTime: startTime2,
        online: realm2Chars.count,
        realmName: realm2.name,
        onlineChars: realm2.rows
    }
    
  const realmStatus = [ realmStatus1, realmStatus2 ]

  if ( realmStatus ) {
    res.status( 200 ).json( realmStatus )
  } else {
    res.status( 404 )
    throw new Error( "Status not available" )
  }
} )

export { getStatus }