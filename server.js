//======================================
// AzerothCoreAPI
// www.azerothcore.org
// Written by Mitchell Blankenship
//======================================

//======================================
// Dependencies
//======================================
import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

//======================================
// Express
//======================================
const app = express()
const port = process.env.PORT || 5000

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )

//======================================
// Routes
//======================================
app.get( '/', ( req, res ) => {
  res.json( { message: 'Welcome to AzerothCoreAPI' } )
})

//======================================
// Start Server
//======================================
app.listen( port, () => {
  console.log( `Server listening on port ${port}` )
} )