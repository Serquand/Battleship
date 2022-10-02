import * as dotenv from 'dotenv'
dotenv.config()

import Sequelize from 'sequelize'

export default new Sequelize(process.env.DB_Name, process.env.DB_User, process.env.DB_Pwd, {
    host: process.env.DB_Host,
    dialect: process.env.DB_Dialect,
    logging: false
})