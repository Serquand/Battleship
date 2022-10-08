import sequelize from "./Connection.js"
import { DataTypes } from "sequelize"
import Player from './Players.js'

export default sequelize.define("Game", {
    id: {
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4, 
        unique: true, 
        primaryKey: true,
        allowNull: false
    }, 

    result: {
        type: DataTypes.UUID, 
        allowNull: false
    },
    
    eloPlayer1: {
        type: DataTypes.INTEGER, 
        allowNull: false
    }, 

    eloPlayer2: {
        type: DataTypes.INTEGER, 
        allowNull: false
    },

    player1: {
        type: DataTypes.UUID, 
        references: {
            model: Player, 
            key: 'id'
        }
    }, 

    player2: {
        type: DataTypes.UUID, 
        references: {
            model: Player, 
            key: 'id'
        }
    }, 
}, {
    timestamps: true,
    sequelize, 
    modelName: "Game",
    tableName: 'Games',
});