import { Sequelize, DataTypes, Model } from 'sequelize';

const sequelize = new Sequelize()

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING
    },
    forename: {
        type: DataTypes.STRING
    },
    surname: {
        type: DataTypes.STRING
    },
    isAnAdminstrator: {
        type: DataTypes.BOOLEAN
    },
    lastLoggedIn: {
        type: DataTypes.DATE
    },
    loginEnabled: {
        type: DataTypes.BOOLEAN
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    token: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})

export default User
