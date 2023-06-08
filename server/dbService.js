const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

var db_config = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  };

var connection;

function handleDisconnect() {
  connection = mysql.createConnection(db_config);

connection.connect((err) => {
    if (err){
        console.log(err.message);
        setTimeout(handleDisconnect, 2000);
    }
    console.log('db ' + connection.state);
})

connection.on('error', function(err) {
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') {
        handleDisconnect();
    } else {                                      
        throw err;                                
      }
    });
  }
  
  handleDisconnect();

class DbService{
    static getDbServiceInstance(){
            return instance ? instance : new DbService();
    }
    async getAllTip(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 
                "SELECT  employee.name, tips.date as date, MAX(tips.amTip) as amTip, MAX(tips.pmTip) as pmTip FROM tips CROSS JOIN employee WHERE employee.id = tips.employee GROUP BY employee.name ORDER BY tips.employee;"
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

    async getAllTip_sf(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = 
                "SELECT  sf_employee.name, sf_tips.date as date, MAX(sf_tips.amTip) as amTip, MAX(sf_tips.pmTip) as pmTip FROM tips CROSS JOIN sf_employee WHERE sf_employee.id = sf_tips.employee GROUP BY sf_employee.name ORDER BY sf_tips.employee;"
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

    async getAllData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM employee;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);       
                })
            });
            //  console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }

    async getAllSFData(){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM sf_employee;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);       
                })
            });
            //  console.log(response);
            return response;
        } catch (error){
            console.log(error);
        }
    }

    async insertNewName(name){
        try{
            const tip_per = 0;
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO employee (name, tip_per) VALUES(?,?);";

                connection.query(query, [name, tip_per] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })
            });
        //console.log(insertId);
            return {
                id : insertId,
                name : name,
                tip_per: tip_per
         };
            return insertId;

        }catch(error){
            console.log(err);
        }
    }

    async insertNewName_sf(name){
        try{
            const tip_per = 0;
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO sf_employee (name, tip_per) VALUES(?,?);";

                connection.query(query, [name, tip_per] , (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results.insertId);
                })
            });
        //console.log(insertId);
            return {
                id : insertId,
                name : name,
                tip_per: tip_per
         };
            return insertId;

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

    async deleteRowById_sf(id) {
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM sf_employee WHERE id = ?";

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

    async updateTipById_sf(id, tip_per){
        try{
            id = parseInt(id, 10);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE sf_employee SET tip_per = ? WHERE id = ?";

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

    async updateTips(employee, date, amTip, pmTip){
        try{
            employee = parseInt(employee, 10);
            //console.log(typeof 'employee');
            console.log(date);
            //let date = new Date();
            // date.toDateString();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO tips (employee, date, amTip, pmTip) VALUES(?,?,?,?);";

                connection.query(query, [employee, date, amTip, pmTip] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            //console.log(insertId);
            return {
                id: insertId,
                employee: employee,
                date : date,
                pmTip: pmTip
            };
        console.log(result);
        }catch(error){
            console.log(error);
        }
    }

    async updateTips_sf(employee, date, amTip, pmTip){
        try{
            employee = parseInt(employee, 10);
            //console.log(typeof 'employee');
            console.log(date);
            //let date = new Date();
            // date.toDateString();
            const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO sf_tips (employee, date, amTip, pmTip) VALUES(?,?,?,?);";

                connection.query(query, [employee, date, amTip, pmTip] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                })
            });
            //console.log(insertId);
            return {
                id: insertId,
                employee: employee,
                date : date,
                pmTip: pmTip
            };
        console.log(result);
        }catch(error){
            console.log(error);
        }
    }

    async searchByDate(date) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 
                "SELECT  employee.name, tips.date as date, MAX(tips.amTip) as amTip, MAX(tips.pmTip) as pmTip FROM tips CROSS JOIN employee WHERE employee.id = tips.employee AND date = ? GROUP BY employee.name ORDER BY tips.employee";

                connection.query(query, [date], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async searchByDate_sf(date) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = 
                "SELECT  sf_employee.name, sf_tips.date as date, MAX(sf_tips.amTip) as amTip, MAX(sf_tips.pmTip) as pmTip FROM sf_tips CROSS JOIN sf_employee WHERE sf_employee.id = sf_tips.employee AND date = ? GROUP BY sf_employee.name ORDER BY sf_tips.employee";

                connection.query(query, [date], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = DbService;