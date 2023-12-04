import express from 'express';
import { routerUsuarios } from './src/routes/routesUsuarios';
import { routerVideo } from './src/routes/routesVideo';
import { mongoose } from '@typegoose/typegoose';
import { routerComentario } from './src/routes/routesComentario';
import cors from "cors"
import multer from "multer";
import path from 'path';
import bodyParser from 'body-parser'

const dbUrl ='mongodb://localhost:27017/tp-Final';

export const URL_IMG = "http://localhost:3000/img/";

mongoose.connect(dbUrl, ).then(() =>{
  console.log("Conectado")
}).catch((error)=>{
  console.log("No conectado", error)
});

const app: express.Application = express();


const storage = multer.diskStorage({
    
  destination: (req, file, cb) => {
    cb(null, 'src/img/' + file.fieldname);
  },

  filename: (req, file, cb) => {
      const timestamp = new Date().getTime();
      const fileExtension = file.originalname.split('.').pop();
      const uniqueFilename = `${timestamp}.${fileExtension}`;
      req.body[file.fieldname] = uniqueFilename
      cb(null, uniqueFilename);
  },

});
const upload = multer({ dest: 'miniatura/' });


const port = 3000;
app.use(cors())
app.use(express.json());
app.use(bodyParser.json())
app.use(routerUsuarios);

app.get('/', (_req , _res) => _res.send('Bienvenido a mi API REST!'));

app.use("/register", routerUsuarios);

app.use("/login", routerUsuarios);

app.use("/video", routerVideo);

app.use("/comentario", routerComentario);

app.use('/miniaturas', express.static("miniaturas"));

app.listen(port, () => console.log(`Escuchando en el puerto ${port}!`));
