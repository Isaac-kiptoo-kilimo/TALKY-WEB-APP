
import { Request, Response } from 'express'
import { v4 } from 'uuid'
import Connection from "../dphelpers/dpHelpers";
import { createPostValidation, updatePostSchema, validateComment, validateCommentReply, validateUpdateComment } from '../validators/validators';
import { dbConfig } from '../config/db';
import mssql from 'mssql'
const dbhelpers = new Connection



export const createPostControllers = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    let { postImage, userID, caption } = req.body;

    let { error } = createPostValidation.validate(req.body);

    if (error) {
      return res.status(404).json({ error: error.details });
    }

    let postID = v4();

    let result = await dbhelpers.execute('createPost', {
      postID, userID, caption
    });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Post not created, check the your inputs",
      });
    }

    const mediaCreationPromises = postImage.map(async (mediaFile: string) => {
      let postMediaID = v4();
      let result = await dbhelpers.execute('createPostMedia', {
        postMediaID,
        postID,
        mediaFile
      });

      if (result.rowsAffected[0] === 0) {
        throw new Error("Post Media not created");
      }

      // Return the created post media ID
      return postMediaID;
    });

    const postMediaIds = await Promise.all(mediaCreationPromises);

    return res.status(200).json({
      message: 'Post created successfully'
    });
  } catch (err) {

    return res.status(404).json({
      error: (err as Error).message
      
    });
  }
};



export const getSinglePostController = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    const result = await dbhelpers.execute('GetPost', { postID });

    // Check if the post is found
    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    return res.status(200).json({
      post: result.recordset[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};



export const getAllPostControllers = async (req: Request, res: Response) => {
  try {
    const pool = await mssql.connect(dbConfig);
    let users = (await pool.request().execute('getAllPostsAndMedia')).recordset

    return res.status(201).json(users)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



export const updatePostController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { postID } = req.params
    let { postImage, caption } = req.body;

    let { error } = updatePostSchema.validate(req.body);

    if (error) {
      return res.status(404).json({ error: error.details });
    }

    let updatedAt = new Date().toISOString();

   
    await dbhelpers.execute('deletePostMedia', {
      postID,
    });

    
    const mediaCreationPromises = postImage.map(async (mediaFile: string) => {
      let postMediaID = v4();
     
      let result = await dbhelpers.execute('createPostMedia', {
        postMediaID,
        postID,
        mediaFile
      });

      if (result.rowsAffected[0] === 0) {
        throw new Error("Something went wrong, Post Media not created");
      }

      
      return postMediaID;
    });

  
    const postMediaIds = await Promise.all(mediaCreationPromises);


    let result = await dbhelpers.execute('updatePost', {
      postID,
      caption
    });
    console.log(result);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong when updating the post",
      });
    }

    return res.status(200).json({
      message: 'Post updated successfully',
      postID,
      postMediaIds,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: (err as Error).message,
      message: 'Error in deleting a post',
    });
  }
}


export const deletePostController = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    if (!postID) {
      return res.status(400).json({
        error: 'Check the postID ',
      });
    }

    const result = await dbhelpers.execute('deletePost', { postID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Post not found or not deleted',
      });
    }

    return res.status(200).json({
      message: 'Post deleted successfully',
      postID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: (err as Error).message,
      message: 'Error in deleting a post',
    });
  }
};


export const addCommentController = async (req: Request, res: Response) => {
  try {
    const { userID, postID, content } = req.body;

    const { error } = validateComment.validate(req.body);

    if (error)    
      return res.status(400).send({ error: error.details });


    const commentID = v4();

    const result = await dbhelpers.execute('addComment', {
      commentID,
      userID,
      postID,
      content
    });
    console.log(result);

    if (result.rowsAffected[0] === 0) {
      res.status(404).json({
        message: 'User or post does not exist. Comment not added.',
      });

    } else {
      res.status(200).json({
        message: 'Comment added successfully',
        content
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const getAllCommentsController = async (req: Request, res: Response) => {
  try {
    const result = await dbhelpers.execute('getAllComments');
    // getAllPostComments

    const comments = result.recordset;

    if (comments.length > 0) {
      res.status(200).json({
        message: 'Comments retrieved successfully',
        comments,
      });
    } else {
      res.status(404).json({
        message: 'No comments found',
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};


export const updateCommentControllers = async (req: Request, res: Response) => {
  try {
    const { postID, userID, content, commentID } = req.body;


    const { error } = validateUpdateComment.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });


    let result = await dbhelpers.execute("updateComment", {
      postID,
      userID,
      content,
      commentID
    });

    return res.status(200).send({ message: "Comment updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};


export const deleteCommentControllers = async (req: Request, res: Response) => {
  try {
    const commentID = req.params.ID;
    if (!commentID) return res.status(400).send({ error: "please input comment id" });
    await dbhelpers.execute("deleteComment", { commentID });

    res.status(201).send({ message: "comment deleted Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Sever Error",
    });
  }
};



export const getAllPostCommentsControllers = async (req: Request, res: Response) => {
  try {
    const postID = req.params.ID;
    console.log(postID);

    if (!postID) return res.status(400).send({ error: "Id is required" });

    const result = await dbhelpers.execute("getAllPostComments", { postID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const getSingleCommentControllers = async (req: Request, res: Response) => {
  try {
    const commentID = req.params.ID;


    if (!commentID) return res.status(400).send({ error: "Id is required" });

    const result = await dbhelpers.execute("getAllPostComments", { commentID });

    res.json(result.recordset);
  } catch (error) {
    console.log(error);
    res.status(404).send({ message: "internal server error" });
  }
};


export const likePostController = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.body;
    const likesID = v4();

    const result = await dbhelpers.execute('likePost', { likesID, userID, postID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'User or post does not exist. Like not added.',
      });
    }

    return res.status(200).json({
      message: 'successfully Liked the post ',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export const unlikePostController = async (req: Request, res: Response) => {
  try {
    const { userID, postID } = req.body;


    const result = await dbhelpers.execute('unlikePost', { userID, postID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'User has not liked the post. Unlike not performed.',
      });
    }

    return res.status(200).json({
      message: 'Unlike successful',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export const getLikesForPostController = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    const result = await dbhelpers.execute('getLikesForPost', { postID });

    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'No likes found for the post',
      });
    }

    return res.status(200).json({
      likes: result.recordset,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};

export const getLikesCountForPostController = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    const result = await dbhelpers.execute('getLikesCountForPost', { postID });

    const likesCount = result.recordset[0].likesCount;

    return res.status(200).json({
      likesCount,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export const createReplyController = async (req: Request, res: Response) => {
  try {
    const { userID, commentID, text } = req.body;
    const replyID = v4();


    const { error } = validateCommentReply.validate(req.body);

    console.log(error);

    if (error)
      return res.status(400).send({ error: "please put correct details" });

    const result = await dbhelpers.execute('addReplyToComment', { replyID, userID, commentID, text });
    console.log(result);

    return res.status(201).json({
      message: 'Reply to the comment created successfully',
      replyID,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export const updateReplyController = async (req: Request, res: Response) => {
  try {
    const { replyID, text } = req.body;

    const result = await dbhelpers.execute('updateReply', { replyID, text });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Reply not found. Update not performed.',
      });
    }

    return res.status(200).json({
      message: 'Reply updated successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


export const getRepliesController = async (req: Request, res: Response) => {
  try {
    const commentID = req.params.ID;

    const result = await dbhelpers.execute('getAllRepliesForComment', { commentID });


    if (result.recordset.length === 0) {
      return res.status(404).json({
        message: 'No replies found for the comment',
      });
    }

    return res.status(200).json({
      replies: result.recordset,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};




export const deleteReplyController = async (req: Request, res: Response) => {
  try {
    const { replyID } = req.params;

    const result = await dbhelpers.execute('deleteReply', { replyID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Reply not found. Deletion not performed.',
      });
    }

    return res.status(200).json({
      message: 'Reply deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};




export const likeCommentController = async (req: Request, res: Response) => {
  try {
    const { commentID, userID } = req.body;

    const likeID = v4();


    const result = await dbhelpers.execute('likeComment', { commentID, userID, likeID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Comment or user does not exist. Like not added.',
      });
    }

    return res.status(200).json({
      message: 'Like added for the comment successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};



export const unlikeCommentController = async (req: Request, res: Response) => {
  try {
    const { commentID, userID } = req.body;


    const result = await dbhelpers.execute('unlikeComment', { commentID, userID });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Comment or user does not exist. Unlike not performed.',
      });
    }

    return res.status(200).json({
      message: 'Unlike successful',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};


