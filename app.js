const express = require("express");
const config = require("config");
const path = require('path');
const mongoose = require('mongoose');

const env = process.env.NODE_ENV;

const app = express();

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/link.routes'));
app.use('/t', require('./routes/redirect.routes'));

if(env === 'production'){
    app.use("/", express.static(path.join(__dirname, 'client', 'build')));

    app.get("/*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', "index.html"));
    });
}

const PORT = (process.env.PORT || config.get("port")) || 5000;

async function start(){
    try{
        await mongoose.connect(config.get("mongoURL"),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        app.listen(PORT, (req, res) =>{
            console.log(`Server has been started on port: ${PORT}`);
        });
    }catch(e){
        console.log("Server error");
        process.exit(1);
    }
}

start();

