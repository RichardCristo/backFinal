export class Usuario{
     usuario: String;
     contraseña: String;
     
    
    constructor(_usuario:String,_contraseña:String){
        this.usuario=_usuario;
        this.contraseña=_contraseña;
    }

    //Getters

    public get getUsuario() {
        return this.usuario;
    }

    public get getContraseña() {
        return this.contraseña;
    }

    //Setters

    public set setUsuario(username:String) {
        this.usuario=username;
    }

    public set setContraseña(password:String) {
        this.contraseña=password;
    }
}