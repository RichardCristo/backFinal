import { prop, getModelForClass, modelOptions } from "@typegoose/typegoose";

@modelOptions({
    schemaOptions: { 
        collection: "Usuario" 
    }
})

class Usuario{
    @prop()
    public usuario!: String

    @prop()
    public contrasena!: String
        
}

export const modeloUsuario = getModelForClass(Usuario)