import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes } from 'sequelize';

const sequelize = new Sequelize()

interface UserAttributes extends Model<InferAttributes<UserAttributes>, InferCreationAttributes<UserAttributes>> {
    id: number,
    title: string,
    forename: string,
    surname: string,
    isAnAdministrator: boolean,
    lastLoggedIn: Date,
    loginEnabled: boolean,
    email: string,
    password: string,
    token: string
}

const User = sequelize.define<UserAttributes>('User', {
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
    isAnAdministrator: {
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
