const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
var router = express.Router();

const dbService = require('./dbService');
const { request } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended : false }));

const path = require('path');

// define the first route
router.get('/', function (req, res) {
    res.render('../client/index.html');
  });

//create
app.post('/insert', (request, response) => {
    console.log('I got a request!')
    console.log(request.body);
    const { name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.insertNewName(name);

    result
    .then(data => response.json({data: data})) 
    .catch(err => console.log(err));
});

app.post('/tip', (request, response) => {
    //console.log('I got a request!')
    //console.log(request.body);
    let {employee, date, amTip, pmTip} = request.body;
    employee = parseInt(employee, 10);
    const db = dbService.getDbServiceInstance();

    const result = db.updateTips(employee, date, amTip, pmTip);
    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
    //console.log(result)
    // console.log(data)
});

//read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getTips', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllTip();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

//update
app.patch('/update', (request, response) => {
    console.log(request.body);
    const {id, tip_per} = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateTipById(id, tip_per);

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));

});


//delete
app.delete('/delete/:id', (request, response) => {
    //console.log(request.params);
    const {id} = request.params;
    const db = dbService.getDbServiceInstance();
 
    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success: data}))
    .catch(err => console.log(err));

});

app.get('/search/:date', (request, response) => {
    const { date } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByDate(date);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.listen(process.env.PORT, () => console.log('app is running'));