import Joi from "joi";


// user registration validators
export const regUserValidation = Joi.object({
    fullName: Joi.string().required().min(3).max(30),
    username: Joi.string().required().min(3).max(30),
    email : Joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow: ['com', 'ke']
        }
    }),
    password: Joi.string().required().pattern(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
    ),
    profileImage: Joi.string()
})


// user login validators
export const loginUserValidation=Joi.object({
    email: Joi.string().required().email({
        minDomainSegments:2, tlds:{
            allow: ['com', 'ke']
        }
    }),
    password: Joi.string().required().pattern(
        new RegExp('^[a-zA-Z0-9!@#$%^&*()]{3,30}$')
    )

})

// update user validators

export const validateUpdateuser=Joi.object({
    fullName: Joi.string().required().min(3).max(30),
    username: Joi.string().required().min(3).max(30),
    
    profileImage: Joi.string().required()
})

export const createPostValidation = Joi.object({
    postImage: Joi.any(),    
    userID: Joi.string(),
    caption : Joi.string(),
    createdAt : Joi.string(),
})



export const validateComment = Joi.object({
    postID: Joi.string().required(),
    content: Joi.string().required(),
    userID: Joi.string().required(),
    createdAt : Joi.string(),
  });
  
  export const validateUpdateComment = Joi.object({
    content: Joi.string().required(),
    userID: Joi.string(),
    commentID: Joi.string(),
  });

  export const validateCommentReply = Joi.object({
    text: Joi.string().required(),
    userID: Joi.string(),
    commentID: Joi.string()
  });


  export const updatePostSchema = Joi.object({
    postImage: Joi.any(),    
    userID: Joi.string(),
    caption : Joi.string()
})

// export const updatePostValidation = Joi.object({
//     updatedImages: Joi.array().items(Joi.string()),
//     userID: Joi.string(),
//     postID: Joi.string(),
//     caption : Joi.string(),
//     createdAt : Joi.string(),
// })
