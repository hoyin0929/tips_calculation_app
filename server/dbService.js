const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host:process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err){
        console.log(err.message);
    }
    console.log('db ' + connection.state);
})

class DbService{
    static getDbServiceInstance(){
            return instance ? instance : new DbService();
    }
    async getAllTips(){

    }
    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM employee;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);       
                })
            });
            //console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }

    async insertNewName(name){
        try{
            const tip_per = 0;
            const roles = "Kitchen";
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO employee (name, tip_per) VALUES(?,?);";

                connection.query(query, [name, tip_per, roles] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })
            });
        //console.log(insertId);
            return {
                id : insertId,
                name : name,
                tip_per: tip_per,
                roles : roles,
         };
            //return insertId;

        }catch(error){
            console.log(err);
        }
    }

    async deleteRowById(id) {
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM employee WHERE id = ?";

                connection.query(query, [id] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.affectedRows);
                })
            });
            //console.log(response);
            return response === 1? true : false;
        }catch (error) {
            console.log(error);
        }

    }

    async updateTipById(id, tip_per){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE employee SET tip_per = ? WHERE id = ?";

                connection.query(query, [tip_per, id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
            //console.log(response.body);
            return response === 1? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = DbService;