import { Router } from "express";
import BD from "../controladores/BD";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";
import * as fs from "fs";
import { verificarClave } from "../verificacion";
const upload = multer({ dest: 'miniaturas/' }); 

export const routerVideo = Router();

routerVideo.post("/anadirVideo", verificarClave, upload.single('miniatura'),async (req, res) => {
        let videoAux = JSON.parse(req.body.video)
        console.log("entro")
        const file: Express.Multer.File = req.file!
        
        if (!file) {
            console.log("entro al if")
            return res.status(400).send('No file uploaded.');
        }
    
        const extension = file.originalname.split(".")[1];
        const relativePath = path.join(file.originalname);
    
        fs.renameSync(file.path, path.join(file.destination, file.originalname));
    
        videoAux.miniatura = relativePath
   
    BD.añadirVideo(videoAux, res).then((video)=>{
        res.status(200).send(video)
    })
    .catch(err => console.log(err))
});

routerVideo.get("/titulo/:titulo", BD.getUnVideo)

routerVideo.get("/getVideos", BD.getVideos)

routerVideo.get("/etiqueta/:etiqueta", BD.filtrarUnVideo)

routerVideo.patch("/like/:titulo", verificarClave,BD.likearUnVideo)

routerVideo.patch("/dislike/:titulo",verificarClave, BD.dislikearUnVideo)

routerVideo.patch("/editarVideo/:titulo", verificarClave,BD.editarVideo)

routerVideo.delete("/borrarVideo/:titulo", verificarClave,BD.borrarVideo)


//
