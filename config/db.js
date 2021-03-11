// const mysql      = require('mysql2/promise');
// const pool = mysql.createPool({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'mainDB'

//  });
const { Sequelize } = require('sequelize');
// Option 2: Passing parameters separately (other dialects)
const sequelize = new Sequelize('mainDB', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false, // only columun name you have, without = id, createdAt, updatedAt
    freezeTableName: true // only table name you have, without = tablename(s)
  }
})

module.exports = sequelize


// pool.query("SELECT * FROM users", function(err, results) {
//     if(err) console.log(err);
//     console.log(results);
// });
 


// const urr = 'qwerty'
// const value = `NULL, '${urr}', 'TS_specialist', 844453, 'it', 'Vladimir', 'tech support', 'Yura'`
// const dsa = "INSERT INTO `worker` (`id_worker`, `fullName_worker`, `employee_worker`, `tel_worker`, `dep_worker`, `director_worker`, `subd_worker`, `manager_worker`) VALUES(" +  value + ");"
// console.dir(value)
// async function das(){
//   await pool.execute(dsa)
// }



// module.exports = sequelize
// pool.end(function(err) {
//     if (err) {
//       console.log(err.message);
//     }
//     console.log("пул закрыт");
//   });