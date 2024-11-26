import fs from "fs";
import gerarDescricaoComGemini from "../Services/geminiDervices.js";
import { getAllPosts, createPost, atualizarPost } from "../Models/postModel.js";

export async function listarPosts(req, res) {
    const posts = await getAllPosts();
    res.status(200).json(posts);
}

export async function addPosts(req, res){
    const newPost = req.body;

    try{
        const createdPost = await createPost(newPost);
        res.status(200).json(createdPost);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function uploadImage(req, res){
    const newPost = {
        descricao: "",
        imgURL: req.file.originalname,
        alt:""
    }

    try{
        const createdPost = await createPost(newPost);
        const updatedImage = `uploads/${createdPost.insertedId}.png`
        fs.renameSync(req.file.path, updatedImage);
        res.status(200).json(createdPost);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}

export async function updatePosts(req, res){
    const id = req.params.id;
    const urlImage = `http://localhost:3000/${id}.png`


    try{
        const imgBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imgBuffer);
        
        const post = {
            imgURL: urlImage,
            descricao: descricao,
            alt: req.body.alt
        }

        const createdPost = await atualizarPost(id, post);
        res.status(200).json(createdPost);
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({"Erro":"Falha na requisição"});
    }
}