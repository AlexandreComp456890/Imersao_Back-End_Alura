import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, addPosts, uploadImage, updatePosts } from "../Controllers/postController.js";

const corsOpc = {
    origin: "http://localhost:8000",
    optionsSucessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage});
//Para Linux e Mac
//const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOpc));
    //Rota de visualização dos posts
    app.get("/posts", listarPosts);

    //Rota de criação dos posts
    app.post("/posts", addPosts);

    //Rota para colocar imagens no BD
    app.post("/upload", upload.single("imagem"), uploadImage);

    //Rota de atualização do psot
    app.put("/upload/:id", updatePosts);
}

export default routes;
