# AzerothCore API

## Important Note

The AzerothCore Team and Owners DO NOT in any case sponsor nor support illegal public servers. If you use these projects to run an illegal public server and not for testing and learning it is your own personal choice. - [AzerothCore Team](https://www.azerothcore.org/wiki/home)

With that said and me being in complete agreement. This project is birthed of my desire to get some experience working with legacy databases that I did not create nor can I modify how they are designed. I think this is an important skill to have and givin that the AzCore works off of three databases, all containing information that could easily translate to useful pages on a website. It creates a great oppurtunity to learn.

___

## Features
- Create both site and server accounts at the same time. These are seperate accounts but are linked throught the database. Possible caviats would be that if a user changes their password through the in game command the username for the website won't be changed. You can circumvent this by changing the needed account access level for that command in the database.

- Use in game gmLevels for authorization through protecting endpoints with middleware available in the authMiddleware.js file.





















