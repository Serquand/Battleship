import sequelize from "./Connection.js"
import { DataTypes } from "sequelize"

export default sequelize.define("Player", {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        primaryKey: true, 
        unique: true, 
        allowNull: false
    }, 

    Pseudo: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    }, 

    Email: {
        type: DataTypes.STRING, 
        unique: true, 
        allowNull: false
    }, 

    Elo: {
        type: DataTypes.INTEGER, 
        allowNull: false, 
        defaultValue: 800,
    }, 

    maxElo: {
        type: DataTypes.INTEGER,
        allowNull: false, 
        defaultValue: 800
    },

    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    timestamps: false,
    sequelize, 
    modelName: "Player",
    tableName: 'Players',
})