export class Comentario{
   comentario: string;
   like: Array<string>;
   dislike: Array<string>; 
   


   constructor(_comentario: string, _like: Array<string>, _dislike: Array<string>){
        this.comentario = _comentario;
        this.like = _like;
        this.dislike = _dislike;
   }
}