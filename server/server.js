const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
   
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
   
var upload = multer({ storage: storage })
const app = express();

const publicPath = path.resolve(__dirname);
//const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;


// app.use(bodyParser.json()); // support json encoded bodies
//app.use(bodyParser.json({ limit: '50mb', extended: true }));
//app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); // support encoded bodies
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies


// Enable CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.use(express.json());
// Directorio Público
app.use(express.static(publicPath));

// Rutas 
const routes = require('./routes');
app.use('/api', routes );



app.listen(port, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${ port }`);

});
/*
app.post('/form1', upload.array('multi-files'), (req, res) => {  
    res.redirect('./registro.html');
  });*/
/*
app.post('/inf', function (req, res){  
    res.redirect('http://localhost:3000/index.html');
  });*/