
import { Request, Response } from 'express'
import {v4} from 'uuid'
import Connection from "../dphelpers/dpHelpers";
import { createPostValidation, updatePostValidation } from '../validators/validators';
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
      postID,userID,caption });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: "Something went wrong, Post not created",
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
        throw new Error("Something went wrong, Post Media not created");
      }

      // Return the created post media ID
      return postMediaID;
    });

    const postMediaIds = await Promise.all(mediaCreationPromises);

    return res.status(200).json({
      message: 'Post created successfully',
      postID,
      postMediaIds,
    });
  } catch (err) {
    
    return res.status(404).json({
      error: (err as Error).message
      // message: "Error in creating a post",
    });
  }
};



// export const createPostControllers = async (req: Request, res: Response) => {
//   try {
//     console.log(req.body);

//     const { postImage, userID, caption } = req.body;

//     const { error } = createPostValidation.validate(req.body);

//     if (error) {
//       return res.status(400).json({ error: error.details });
//     }

//     const postID = uuidv4();

//     const createPostResult = await dbhelpers.execute('createPost', {
//       postID,
//       userID,
//       caption,
//     });

//     if (createPostResult.rowsAffected[0] === 0) {
//       return res.status(500).json({
//         error: 'Something went wrong, Post not created',
//       });
//     }

//     try {
//       const postMediaID = uuidv4();
//       const cloudinaryUploadResult = await cloudinary.uploader.upload(postImage, {
//         upload_preset: 'i7nxuoly',
//         // Add other Cloudinary upload options as needed
//       });

//       const createPostMediaResult = await dbhelpers.execute('createPostMedia', {
//         postMediaID,
//         postID,
//         mediaFile: cloudinaryUploadResult.secure_url, // Use the Cloudinary URL here
//       });

//       if (createPostMediaResult.rowsAffected[0] === 0) {
//         throw new Error('Something went wrong, Post Media not created');
//       }

//       return res.status(201).json({
//         message: 'Post created successfully',
//         postID,
//         postMediaId: postMediaID, // Return the created post media ID
//       });
//     } catch (uploadError) {
//       console.error('Error uploading to Cloudinary:', uploadError);
//       return res.status(500).json({
//         error: 'Error uploading image to Cloudinary',
//       });
//     }
//   } catch (err) {
//     console.error('Error creating post:', err);
//     return res.status(500).json({
//       error: (err as Error).message,
//     });
//   }
// };


export const getAllPostControllers= async(req:Request, res:Response)=>{
  try{
    const pool = await mssql.connect(dbConfig);
    let users = (await pool.request().execute('getAllPostsAndMedia')).recordset

    return res.status(201).json(users)
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// export const updatePostControllers = async (req: Request, res: Response) => {
//   try {
    

//     let {
//       post_id,
//       updatedCaption,
//       updatedPostType,
//       updated_at,
//     } = req.body;

    
//     if (!post_id) {
//       return res.status(400).json({
//         message: 'Post ID is required for editing',
//       });
//     }

//     // Perform a database update to edit the post
//     let result = await dbhelpers.execute('editPost', {
//       post_id,
//       updatedCaption,
//       updatedPostType,
//       updated_at,
//     });

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         message: 'Something went wrong, Post not updated',
//       });
//     } else {
//       return res.status(200).json({
//         message: 'Post updated successfully',
//       });
//     }
//   } catch (error) {
//     console.log(error);

//     return res.status(500).json({
//       error: 'Internal Server Error',
//     });
//   }
// };

export const updatePostController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);

    const { postID, userID, caption, createdAt, updatedImages } = req.body;
    let { error } = updatePostValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details });
    }
    if (!postID) {
      return res.status(400).json({
        message: 'Post ID is required for editing',
      });
    }
    const result = await dbhelpers.execute('updatePostAndImages', {
      postID,
      userID,
      caption,
      createdAt,
      updatedImages,
    });

    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({
        message: 'Post not found or not updated',
      });
    }

    return res.status(200).json({
      message: 'Post and images updated successfully',
      postID,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: (err as Error).message,
      message: 'Error in updating post and images',
    });

  }
};



export const deletePostController = async (req: Request, res: Response) => {
  try {
    const { postID } = req.params;

    if (!postID) {
      return res.status(400).json({
        error: 'Missing postID parameter',
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