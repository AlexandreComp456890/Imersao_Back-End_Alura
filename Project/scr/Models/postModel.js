import "dotenv/config";
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/dbConfig.js";

const conexao = await conectarAoBanco(process.env.MONGO_URI);

export async function getAllPosts(){
    const db = conexao.db("SomeData");
    const colecao = db.collection("Posts");
    return colecao.find().toArray();
}

export async function createPost(newPost){
    const db = conexao.db("SomeData");
    const colecao = db.collection("Posts");
    return colecao.insertOne(newPost);
}

export async function atualizarPost(id, newPost){
    const db = conexao.db("SomeData");
    const colecao = db.collection("Posts");

    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set: newPost});
}

//6745ffbdf0555db50744e653