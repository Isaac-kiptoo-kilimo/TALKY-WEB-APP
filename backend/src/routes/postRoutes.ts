import { Router } from "express";
import { createPostControllers, deletePostController, getAllPostControllers, updatePostController } from "../controllers/postsControllers";



const postRoute=Router()

postRoute.post('/create', createPostControllers)
postRoute.get('/all', getAllPostControllers)
postRoute.put('/update', updatePostController)
postRoute.delete('/delete/:postID', deletePostController)


export default postRoute