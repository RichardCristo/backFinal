import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: { 
        collection: "Comentario" 
    }
})

class Comentario{
    @prop()
    public comentario!: string

    @prop()
    public likes!: Array<string>
    
    @prop()
    public dislikes!: Array<string>

    
}

export const modeloComentario = getModelForClass(Comentario)
