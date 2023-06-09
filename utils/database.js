//=============================================================================
// AzerothCoreAPI
// database.js
// www.azerothcore.org
// Written by Mitchell Blankenship
//=============================================================================

//=============================================================================
// Dependencies
//=============================================================================
import Sequelize from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const auth = new Sequelize(process.env.AUTH_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
})

const chars2 = new Sequelize(process.env.CHAR_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
})

const world2 = new Sequelize(process.env.WORLD_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
} )

// Added for PersonalEditBranch
const chars = new Sequelize(process.env.CHAR_DB2, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
})

const world = new Sequelize(process.env.WORLD_DB2, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
} )
// End of PersonalEditBranch

const site = new Sequelize( process.env.SITE_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: 'localhost'
})

export {
	auth,
	chars,
	world,
	chars2,
	world2,
	site
}
