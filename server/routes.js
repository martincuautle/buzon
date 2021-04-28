// Routes.js - Módulo de rutas
const express = require('express');
const router = express.Router();
//const push = require('./push');
const nodemailer = require('nodemailer');
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
/*const mensajes = [

  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }

];


// Get mensajes
router.get('/inf', function (req, res) {
  // res.json('Obteniendo mensajes');
  res.json( mensajes );
});*/
/*

// Post mensaje
router.post('/', function (req, res) {
  

  // console.log( req.body.lat );
  // console.log( req.body.lng );

  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user,
    lat: req.body.lat,
    lng: req.body.lng,
    foto: req.body.foto
  };

  mensajes.push( mensaje );

  console.log(mensajes);


  res.json({
    ok: true,
    mensaje
  });
});
*/
/*
// Almacenar la suscripción
router.post('/subscribe', (req, res) => {


  const suscripcion = req.body;

  
  push.addSubscription( suscripcion );


  res.json('subscribe');

});

// Almacenar la suscripción
router.get('/key', (req, res) => {

  const key = push.getKey();


  res.send(key);

});

*/
// Envar una notificación PUSH a las personas
// que nosotros queramos
// ES ALGO que se controla del lado del server
const connection= require('../server/base');
router.get('/mun',(req,res)=> {
    connection.query("SELECT  DISTINCT cp_municipio FROM cp where cp_estado='PUEBLA' ORDER BY cp_municipio ASC", (err, rows, fields) =>{
      if(!err){
        var cadena="";
        rows.forEach( (row) => {
          cadena+=`<option value='${row.cp_municipio}'>${row.cp_municipio}</option>`;
        });
        res.json(cadena);
        console.log("rows");
      }else{
        console.log(err);
      }
    });
});
router.post('/localidades',(req,res)=> {
  const {
    municipio
   
  }=req.body;
  let sql=`SELECT cp_asentamiento, cp_id FROM cp where cp_estado='PUEBLA' and cp_municipio='${municipio}' ORDER BY cp_asentamiento ASC`;
  //res.json(sql);
  connection.query(sql, (err, rows, fields) =>{
    if(!err){
      var cadena="";
      rows.forEach( (row) => {
        cadena+=`<option value='${row.cp_asentamiento}|${row.cp_id}'>${row.cp_asentamiento}</option>`;
      });
      res.json(cadena);
      console.log("rows");
    }else{
      console.log(err);
    }
  });
  //res.json(post);
});
/*router.post('/push', (req, res) => {

  const post = {
    titulo: req.body.titulo,
    cuerpo: req.body.cuerpo,
    usuario: req.body.usuario
  };


  push.sendPush( post );

  res.json( post );

});*/

router.post('/sendemail',  (req, res)=> {
  console.log(req.body);
  //res.send(req.body)
  //res.send("recibido");
  // console.log( req.body.lat );
  // console.log( req.body.lng );

  const {
    personas,   
    telefono,
    correo 
  }=req.body;

 
  contentHTML=`
    <h1>Mensaje de Buzon 4T</h1>      
    <p>
    Gracias por contribuir a dignificar la 4 transformación en Puebla.
    A través de estos medios estaremos informando de las acciones a seguir para recuperar nuestro partido.
    </p>
    <p>https://buzon4tpuebla.com/public/index.html</p>
  `;
  contentHTML2=`
    <h1>Informacion De Seguimiento</h1>
    <p>La siguiente persona apoya las acciones para defender al partido y a la cuarta transformación</p>      
    `;
    if(personas.trim()!=""){
      contentHTML2+=`
      <p>Nombre: ${personas}</p>      
      `;
    }
    if(telefono.trim()!=""){
      contentHTML2+=`
      <p>Teléfono: ${telefono}</p>      
      `;
    }
    if(correo.trim()!=""){
      contentHTML2+=`
      <p>Correo: ${correo}</p>      
      `;
    }
    
    const transporter = nodemailer.createTransport({
      host: '72.167.225.210',
      port: 587,
      secure: false,
      auth: {
          user: 'contacto@buzon4tpuebla.com',
          pass: '{JdxXtk).d4L'
      },
      tls: {
          rejectUnauthorized: false
      }
  });
  var mailCiudadano={
      from: '"Buzon 4T" <contacto@buzon4tpuebla.com>', // sender address,
      to: "bleikrr@gmail.com,gortegab@gmail.com",
      subject: 'Contacto Buzon 4T',
     // text: 'Hello World'
      html: contentHTML
  }
  var mailResponsable={
    from: '"Buzon 4T" <contacto@buzon4tpuebla.com>', // sender address,
    to: "tnt_november_rain@hotmail.com,gortegab@gmail.com",
    subject: 'Contacto Buzon 4T',
   // text: 'Hello World'
    html: contentHTML2
  }
 /*   transporter.sendMail(mailCiudadano, (error, info)=>{
     if(error){
      res.json({
        ok: error.message,        
      });
       //res.status(500).send(error.message);
     } else{
      res.json({
        ok: true,        
      });
       console.log("enviado");
      // res.status(200).jsonp(req.body);
     }
  });
  transporter.sendMail(mailResponsable, (error, info)=>{
    if(error){
     res.json({
       ok: error.message,        
     });
      //res.status(500).send(error.message);
    } else{
     res.json({
       ok: true,        
     });
      console.log("enviado");
     // res.status(200).jsonp(req.body);
    }
 });*/
 res.redirect('./index.html');
});

router.post('/form1', upload.array('multi-files'), (req, res) => {  
  res.redirect('./registro.html');
});

module.exports = router;