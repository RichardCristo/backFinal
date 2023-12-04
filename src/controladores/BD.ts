import express from "express";
import { modeloVideo } from "../modelos/modeloVideo";
import { Comentario } from "../clases/comentario";
import { Video } from "../clases/video";
import jwt from "jsonwebtoken";
import { modeloUsuario } from "../modelos/modeloUsuario";

function usuarioPorToken(token: any){
    const decoded = jwt.decode(token);
    const parsedDecoded = JSON.parse(JSON.stringify(decoded));
    console.log("usuarioPorToken: ")
    console.log(parsedDecoded)
    return parsedDecoded;
}

export default{
    añadirVideo: async(video: Video,  _res: express.Response) => {
        video.visitas = 0;
        video.likes = [  ];
        video.dislikes = [ ];
        await modeloVideo.create(video).then((videoSubido: Video) =>{
           return _res.status(200).send(videoSubido) 
        }) 
    },

    getUnVideo: async(_req: express.Request, _res: express.Response) => {
        const asd = await modeloVideo.find({"titulo": _req.params.titulo})
        return _res.status(200).send(asd);
    },

    getVideos: async(_req: express.Request, _res: express.Response) => {
        const asd = await modeloVideo.find()
        _res.status(200).send(asd);
    },

    likearUnVideo: async(_req: express.Request, _res: express.Response) => {
        const video = await modeloVideo.findOne({titulo: _req.params.titulo})
        console.log("likearUnVideo: ")
        console.log(_req.headers.authorization)
        const usuario = usuarioPorToken(_req.headers.authorization)
        let estaRepetido : Boolean = false
        if(!video){
            return _res.status(404).send("NO")
        }

        await video.likes.forEach(async element => {
            if (element == usuario.usuario) { 
                console.log("Ya likeaste el video")
                 _res.status(200).send("ya likeaste el video")
                 estaRepetido = true
            }
        });

        await video.dislikes.forEach(async element => {
            if (element == usuario.usuario) { 
                console.log("Ya likeaste el video")
                 _res.status(200).send("ya likeaste el video")
                 estaRepetido = true
            }
        });

        if(estaRepetido){return}
            console.log("oasdk")
            console.log(usuario.usuario)
            video.likes.push(usuario.usuario)
            const update = await modeloVideo.findOneAndUpdate(
                {
                    titulo: _req.params.titulo
                },
            {likes : video.likes})
            return _res.status(200).send(String(video.likes.length))
    },

    dislikearUnVideo: async(_req: express.Request, _res: express.Response) => {
        const video = await modeloVideo.findOne({titulo: _req.params.titulo})
        console.log("likearUnVideo: ")
        console.log(_req.headers.authorization)
        const usuario = usuarioPorToken(_req.headers.authorization)
        let estaRepetido : Boolean = false
        if(!video){
            return _res.status(404).send("NO")
        }

        await video.likes.forEach(async element => {
            if (element == usuario.usuario) { 
                console.log("Ya likeaste el video")
                 _res.status(200).send("ya likeaste el video")
                 estaRepetido = true
            }
        });
        
        await video.dislikes.forEach(async element => {
            if (element == usuario.usuario) { 
                console.log("Ya likeaste el video")
                 _res.status(200).send("ya likeaste el video")
                 estaRepetido = true
            }
        });

        if(estaRepetido){return}
            console.log("oasdk")
            console.log(usuario.usuario)
            video.likes.push(usuario.usuario)
            const update = await modeloVideo.findOneAndUpdate(
                {
                    titulo: _req.params.titulo
                },
            {dislikes : video.dislikes})
            return _res.status(200).send(String(video.dislikes.length)) 
    },

    filtrarUnVideo: async (_req: express.Request, _res: express.Response) => {
        try {
            const videosConEtiquetaFutbol = await modeloVideo.find({ etiquetas: _req.params.etiqueta });
            if (videosConEtiquetaFutbol.length > 0) {
                _res.status(200).send(videosConEtiquetaFutbol);
            } else {
                _res.status(404).send('No se encontraron videos con la etiqueta "futbol"');
            }
        } catch (error) {
            console.error(error);
            _res.status(500).send('Error interno del servidor');
        }
    },

    editarVideo:async (_req: express.Request, _res: express.Response) => {
        const asd = await modeloVideo.findOneAndUpdate({"titulo": _req.params.titulo}, _req.body)
        _res.status(200).send(asd)       
    }, 

    borrarVideo: async(_req: express.Request, _res: express.Response) => {
        const asd = await modeloVideo.findOneAndDelete({"titulo": _req.params.titulo})
        _res.status(200).send(asd)
    },

    hacerUnComentario: async (_req: express.Request, _res: express.Response) => {
        let comentarioAux = _req.body.comentario;
        const nuevoComentario = new Comentario(comentarioAux, [], [])
        let video = await modeloVideo.findOne({ titulo: _req.params.titulo });
        if (video) {
            video.comentarios.push(nuevoComentario);
            await video.save();
            _res.status(200).send(nuevoComentario);
        } else {
            _res.status(404).send("Video no encontrado");
        }
    },

    likearUnComentario: async(_req: express.Request, _res: express.Response) => {
        const video = await modeloVideo.findOne({titulo: _req.params.titulo})
        console.log("likearUnVideo: ")
        console.log(_req.headers.authorization)
        const usuario = usuarioPorToken(_req.headers.authorization)
        let estaRepetido : Boolean = false
        let comentariosAux : Comentario[] = video!.comentarios

        if(!video){
            return _res.status(404).send("NO")
        }
        
        let comentario = comentariosAux[Number(_req.params.id)]
        let likesAux : Array<string> = comentario.like
        console.log("likesaux:")
        console.log(likesAux)
        likesAux.forEach(async likes =>{
              if (likes == usuario.usuario) { 
                   console.log("Ya likeaste el comentario")
                     _res.status(200).send("ya likeaste el comentario")
                     estaRepetido = true
                }
            })           
    
            let dislikesAux : Array<string> = comentario.dislike
            dislikesAux.forEach(async dislike =>{
                if (dislike == usuario.usuario) { 
                    console.log("Ya dislikeaste el comentario")
                     _res.status(200).send("ya dislikeaste el comentario")
                     estaRepetido = true
                }
            }) 
        

        if(estaRepetido){return}
            console.log("oasdk")
            console.log(usuario.usuario)
            comentariosAux[Number(_req.params.id)].like.push(usuario.usuario)
            const update = await modeloVideo.findOneAndUpdate(
                {
                    titulo: _req.params.titulo
                },
            {comentarios : comentariosAux})
            console.log(video.comentarios[Number(_req.params.id)].like.length)
            return _res.status(200).send(String(video.comentarios[Number(_req.params.id)].like.length))

    },

    dislikearUnComentario: async(_req: express.Request, _res: express.Response) => {
        const asd = await modeloVideo.findOne({titulo: _req.params.titulo})
        if(!asd){
            return _res.status(404).send("NO")
        }
        //asd.comentarios[Number(_req.params.id)].dislike = asd.comentarios[Number(_req.params.id)].dislike +1
        const update = await modeloVideo.findOneAndUpdate(
            {
                titulo: _req.params.titulo
            },
        {comentarios : asd?.comentarios})
        _res.status(200).send(update)

    },

    getUsuario: async(_req: express.Request, _res: express.Response) => {
        const usuario = await modeloUsuario.findOne({usuario: _req.params.usuario})
        return _res.status(200).send(usuario)
    }


}

