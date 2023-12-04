import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";
import { Comentario } from "../clases/comentario";

@modelOptions({
    schemaOptions: { 
        collection: "Video" 
    }
})

class Video{
    @prop()
    public titulo!: string

    @prop()
    public visitas!: number

    @prop()
    public likes!: Array<string>
    
    @prop()
    public dislikes!: Array<String>

    @prop()
    public etiquetas!: Array<string>

    @prop()
    public comentarios!: Array<Comentario>

    @prop()
    public miniatura!: String

    @prop()
    public publicador!: String

}

export const modeloVideo = getModelForClass(Video)

