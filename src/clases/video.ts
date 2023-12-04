import { Comentario } from "./comentario";

export class Video{

    titulo: String;
    visitas: number;
    likes: Array<String>;
    dislikes: Array<String>;
    etiquetas: Array<string> 
    comentarios: Array<Comentario>
    miniatura: String
    publicador: String
    
    constructor(_titulo: String, _visitas: number, _likes: Array<String>, _dislikes: Array<String>, _etiquetas: Array<string>, _comentarios: Array<Comentario>, _miniatura: String, _publicador: String){
        this.titulo =_titulo;
        this.visitas =_visitas;
        this.likes = _likes;
        this.dislikes = _dislikes;
        this.etiquetas = _etiquetas;
        this.comentarios = _comentarios
        this.miniatura = _miniatura;
        this.publicador = _publicador
    }
    
}