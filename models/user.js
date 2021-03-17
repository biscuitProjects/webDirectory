const sequelize = require('../config/db')
const {secret} = require("../config/config")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Sequelize, DataTypes, Model } = require('sequelize')

const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false
    },
    hashPassword: {
      type: Sequelize.STRING,
      allowNull: false
    },
    role:{
        type: Sequelize.STRING,
        allowNull: false
    }   
}, {
    timestamps: false,
})


module.exports = User

// class users{
//     constructor(username, password, role = 'user') {
//         this.username = username;            
//         this.password = password;
//         this.role = role
//     };
    
//     async findUser(username){
//         const [rows, fields] = await db.execute('SELECT * FROM users WHERE username = + ?', [username])
//         return rows
//     }

//     async createUser(username, password, role = 'user'){
//         const sql = `INSERT INTO users(id, username, password, role) VALUES( ${0}, '${username}', '${password}', '${role}')`;
//         const abc = await db.execute(sql)
//         console.log(abc)
//     }



//     async checkUserPassword(hashUsername, username){
//         // проверяем верный ли пароль ввёл пользователь
//         const validPassword = bcrypt.compareSync(hashUsername, username)
//         if (!validPassword) {
//             return `Введен неверный пароль`
//         }
//         return validPassword
//     }

//     async createToken(username, role){
//         return tokengenerateAccessToken(username, role)
//     }




// }
// module.exports = new users
