import { Router } from "express";
import BD from "../controladores/BD";
import { verificarClave } from "../verificacion";

export const routerComentario = Router();

routerComentario.patch("/hacerUnComentario/:titulo", verificarClave,BD.hacerUnComentario)

routerComentario.patch("/like/:titulo/:id",verificarClave,BD.likearUnComentario)

routerComentario.patch("/dislike/:titulo/:id",verificarClave,BD.dislikearUnComentario)