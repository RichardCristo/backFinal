import { Request, Response } from "express";
import { Usuario } from "../clases/usuario";

const { MongoClient } = require("mongodb");

const url = "mongodb://localhost:27017/tp-Final";

const client = new MongoClient(url)


export async function findUsuarios() {
        const database = client.db('tp-Final');
        const usuarios = database.collection('Usuarios');

        const documentos = await usuarios.find().toArray();
        const usuarioArray = documentos.map((doc: { username: String; password: String }) => new Usuario(doc.username, doc.password));
        console.log(usuarioArray);
        return usuarioArray;
   }

export async function findUsuario(username:String) {

        const database = client.db('tp-Final');
        const usuarios = database.collection('Usuarios');

        const query = { username: username };
        const doc = await usuarios.findOne(query);
    
        if(!doc){
          console.log("No encontrado")
          return null;
        }
        
        const usuario = new Usuario(doc.username, doc.password)
        console.log(usuario);

        return usuario;
   }


   export async function deleteUsuario(username: String) {

      const database = client.db('tp-Final');
      const vacunas = database.collection('Usuarios');
      const query = { username: username };
      const result = await vacunas.findOneAndDelete(query);
      if (!result.value) {
        return 400;
      }
      return 204;
}

export async function insertUsuario(usuario: Usuario){
  const database = client.db('tp-Final');
  const users = database.collection('Usuarios');

  await users.insertOne({
    username: usuario.getUsuario,
    password: usuario.getContraseña,
  });
}

export async function updateUsuario(usuario: Usuario) {
    const database = client.db('tp-Final');
    const users = database.collection('Usuarios');
    const query = { username: usuario.getUsuario };
    const result = await users.findOneAndReplace(query, JSON.parse(JSON.stringify(usuario)));
    if (!result.value) {
      return 404;
    }
    else return 204;
  
}