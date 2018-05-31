const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: 'uploads/'});
const mongoose = require('mongoose');
const crypto = require('crypto');
const morgan = require('morgan');

let server = express();
    server.use(cors());
    server.use(express.static(__dirname + '/frontEnd'));
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({extended:true}));
    server.use(morgan('dev'));

//Code below stores data to a local server using MongoDB. Sort of unnecessary
//but it was interesting to test it out. Commented out cause it is
//just unneeded. Uses Crypto to encrypt the data. Cool stuff.


/*mongoose.connect('mongodb://localhost:27017');
const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'Connection error'));
      db.once('open', ()=>{
          console.log("Connected to mongodb...");
       });

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, callback)=>{
        crypto.pseudoRandomBytes(16, (err, raw)=>{
            if (err) return callback(err);
            callback(null, raw.toString('hex') + path.extname(file.originalname))
        });
    }
}); */

server.post('/uploads',upload.single('file'), (req, res)=>{
    if (!req.file){
        console.log('No file was recieved...');
        return res.send({
            sucesss: false
        });
    } else{
        console.log('File recieved...');
        res.json(req.file);
    }
})
       
server.listen(8000, ()=>{
    console.log('MetaData running on port 8000...');
})