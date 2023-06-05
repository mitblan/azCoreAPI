//=============================================================================
// AzerothCoreAPI
// server.js
// www.azerothcore.org
// Written by Mitchell Blankenship
//=============================================================================

//=============================================================================
// Dependencies
//=============================================================================
import express from 'express'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import cookieParser from 'cookie-parser'
dotenv.config()

//=============================================================================
// Express
//=============================================================================
const app = express()
const port = process.env.PORT || 5000

app.use( express.json() )
app.use( express.urlencoded( { extended: true } ) )
app.use( express.static( 'public' ) )
app.use(cookieParser())

//=============================================================================
// Routes
//=============================================================================
app.use( '/api/users', userRoutes )

app.get( '/', ( req, res ) => {
  res.json( { message: 'Welcome to AzerothCoreAPI' } )
})

//=============================================================================
// Start Server
//=============================================================================
app.listen( port, () => {
  console.log( `Server listening on port ${port}` )
} )