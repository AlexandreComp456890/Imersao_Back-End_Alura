import express from 'express';
import routes from './scr/Routes/postRouter.js';

const app = express();
const PORT = 3000;

//console.log(process.env.MONGO_URI);
//console.log(typeof process.env.MONGO_URI);

/*Test Array
const posts = [
  {
    id: 1,
    name: "something",
    image: "https://placecats.com/millie/300/150",
  },
  {
    id: 2,
    name: "another thing",
    image: "https://placecats.com/fluffy/300/150",
  },
  {
    id: 3,
    name: "cool stuff",
    image: "https://placecats.com/whiskers/300/150",
  },
  {
    id: 4,
    name: "adorable cat",
    image: "https://placecats.com/kitty/300/150",
  },
  {
    id: 5,
    name: "yet another post",
    image: "https://placecats.com/simba/300/150",
  }
];
*/

/*Test json
function idSearcher (id){
  return posts.findIndex((post) =>{
    return post.id === (Number(id));
  });
}

app.get("/test/:id", (req, res) =>{
  const index = idSearcher(req.params.id);
  res.status(200).json(posts[index]);
});
*/
app.use(express.static("uploads"));
routes(app);

app.listen(PORT, () => {
  console.log('Servidor escutando na porta', PORT);
});