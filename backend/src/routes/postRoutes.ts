import { Router } from "express";
import { addCommentController, createPostControllers, createReplyController, deleteCommentControllers, deletePostController, deleteReplyController, getAllCommentsController, getAllPostCommentsControllers, getAllPostControllers, getLikesCountForPostController, getLikesForPostController, getRepliesController, getSingleCommentControllers, getSinglePostController, likeCommentController, likePostController, toggleLike, unlikeCommentController, unlikePostController, updateCommentControllers, updatePostController, updateReplyController } from "../controllers/postsControllers";



const postRoute=Router()

postRoute.post('/create', createPostControllers)
postRoute.get('/all', getAllPostControllers)
postRoute.get('/single/:postID', getSinglePostController)
postRoute.put('/update/:postID', updatePostController)
postRoute.delete('/delete/:postID', deletePostController)
postRoute.post('/addComment', addCommentController)
postRoute.get('/allComments', getAllCommentsController)
postRoute.put("/updatecomment/:commentID", updateCommentControllers)
postRoute.delete("/deletecomment/:ID", deleteCommentControllers)

postRoute.post('/createreply', createReplyController)
postRoute.get('/allreplies/:ID', getRepliesController)
postRoute.put("/updatereply", updateReplyController)
postRoute.delete("/deletereply/:replyID", deleteReplyController)

postRoute.post('/comment/like', likeCommentController);
postRoute.post('/comment/unlike', unlikeCommentController);

postRoute.get("/getpostcomments/:ID", getAllPostCommentsControllers)
postRoute.get("/singleComment/:ID", getSingleCommentControllers)
postRoute.post('/likepost', toggleLike)
postRoute.post('/unlikepost', unlikePostController)
postRoute.get('/allLikes/:postID', getLikesForPostController)
postRoute.get('/postlikecount/:postID', getLikesCountForPostController)


export default postRoute