const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index'); 
const {PORT} = require('./config/serverConfig');
const db = require('./models/index');

const app = express();

const prepareAndStartServer = ()=>{
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));    

    app.use('/api/', apiRoutes);

    app.listen(PORT ,()=>{
        console.log(`Server Started on Port : ${PORT}`);
        if(process.env.SYNC_DB){
            db.sequelize.sync({alter:false});
        }
    })
}

prepareAndStartServer();