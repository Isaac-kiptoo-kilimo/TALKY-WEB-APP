import { Request, Response } from "express"
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'
import mssql, { query } from 'mssql'
import { dbConfig } from "../config/db"
import { loginUserValidation, regUserValidation, validateUpdateuser } from "../validators/validators"
import { ExtendeUser } from "../middlewares/verifyToken"
import jwt from 'jsonwebtoken'

import Connection from "../dphelpers/dpHelpers"
import { generateResetToken } from "../utils/generateResetToken"
import { isEmpty } from "lodash"


const dbhelpers = new Connection

export const registerUserControllers = async (req: Request, res: Response) => {
  try {
    const { fullName, username, email, password} = req.body


    const { error } = regUserValidation.validate(req.body)
    if (error) {
      return res.status(404).json({
        message: "Check your username/password/email kindly",
        error: error.details

      })
    }

    const userID = v4()
    const hashedpwd = await bcrypt.hash(password, 5);
    const pool = await mssql.connect(dbConfig)



    const results =await pool.request()
      .input('userID', mssql.VarChar, userID)
      .input('fullName', mssql.VarChar, fullName)
      .input('username', mssql.VarChar, username)
      .input('email', mssql.VarChar, email)
      .input('password', mssql.VarChar, hashedpwd)
      .execute('registerUser')

      const resultMessage = results.recordset[0].Result;

      if (resultMessage.includes('User registered successfully')) {
          return res.status(201).json({
              message: 'User registered successfully'
          });
      } else {
          return res.status(400).json({
              message: resultMessage
          });
      }

  } catch (error) {
    return res.status(404).json({
      error: error,
      message: "Server error"
    })
  }
}

export const loginUserControllers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const { error } = loginUserValidation.validate(req.body)

    if (error) {
      return res.json({
        error: error.details
      })
    }

    const pool = await mssql.connect(dbConfig);
    const user = await (await pool.request().input('email', mssql.VarChar, email).input('password', mssql.VarChar, password).execute('loginUser')).recordset
    // console.log(user);

    if (user[0]?.email == email) {
      const correctPWD = await bcrypt.compare(password, user[0]?.password);

      if (!correctPWD) {
        return res.status(404).json({
          error: "Incorrect Password"
        })
      }

      const loginCredentials = user.map((records) => {
        const { password, ...rest } = records;
        return rest
      });

      const token = jwt.sign(loginCredentials[0], process.env.SECRET as string, {
        expiresIn: '48h'
      })

      return res.status(201).json({
        message: 'User Logged in successfully',
        token
      })
    } else {
      return res.json({
        error: "Email not found"
      })
    }
  } catch (error) {
    return res.json({
      error: error
    })
  }
}



export const checkCredentials = async (req: ExtendeUser, res: Response) => {
  if (req.info) {
    return res.json({
      info: req.info
    })
  }
}



export const getUserDetails = async (req: ExtendeUser, res: Response) => {
  try {
    const user = req.info
    // console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      })
    }

    const pool = await mssql.connect(dbConfig);
    const userID = user.userID
    console.log(userID);

    const result = await dbhelpers.execute('GetUserDetails', { userID });

    const userDetails = result.recordset
    console.log(userDetails);
    if (!userDetails) {
      return res.status(404).json({ message: 'User details not found' });

    }

    return res.status(200).json(userDetails);

  } catch (error) {
    return res.json({
      error: error
    })
  }
}


export const updateUserControllers = async (req: Request, res: Response) => {
  try {

    const { fullName,username, profileImage } = req.body
    const { userID } = req.params
    const { error } = validateUpdateuser.validate(req.body);
    if (error)
      return res.status(403).json({ success: false, message: error.details[0].message });

      

    const pool = await mssql.connect(dbConfig)
    
    const updatedUser = await pool.request().input('userID', mssql.VarChar, userID).input('fullName', mssql.VarChar, fullName).input('username', mssql.VarChar, username).input('profileImage', mssql.VarChar, profileImage).execute('updateUser')

    return res.json({
      message: "User updated successfully"
    });

  } catch (error) {
    return res.json({
      error: error
    })
  }
}

// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     let { user_id, user_name, profileImage, fullName } = req.body;

//     console.log(profileImage);

//     // if (profileImage === "") {
//     //   profileImage =
//     //     "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?q=80&w=1434&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
//     // }

//     const { error } = validateUpdateuser.validate(req.body);
//     console.log(error);

//     if (error)
//       return res
//         .status(400)
//         .send({ error: "check input infomation if its correct" });

//     const newUser: UpdateUser = {
//       user_id,
//       user_name,
//       profileImage,
//       fullName,
//     };

//     const procedureName = "updateUser";
//     const params = newUser;
//     // console.log(params);

//     await execute(procedureName, params);
//     return res.send({ message: "User updated successfully" });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       error: (error as Error).message,
//       message: "Internal Sever Error",
//     });
//   }
// };

export const fetchAllUsersControllers = async (req: Request, res: Response) => {
  try {
    const loggedInUserID = req.params.loggedInUserID;

    let users = await dbhelpers.execute('getAllUsers', { loggedInUserID });

   
    return res.status(201).json(users.recordset)

  } catch (error) {
    return res.json({
      error: error
    })
  }
}
export const fetchAllAvailableUsersControllers = async (req: Request, res: Response) => {
  try {

    let users = await dbhelpers.execute('getAllUsersAvailable');

   
    return res.status(201).json(users.recordset)

  } catch (error) {
    return res.json({
      error: error
    })
  }
}





export const getSingleUserController = async (req: Request, res: Response) => {
  try {
    const userID = req.params.userID;
    console.log(userID);
    if (!userID) return res.status(403).send({ message: "Id is required" });


    const result = await dbhelpers.execute('getSingleUser', { userID });

    res.json(result.recordset);

  } catch (error) {
    return res.json(400).json({
      error: error
    })
  }
};


// export const deleteUserController = async (req: Request, res: Response) => {
//   try {
//     const { userID } = req.params

//     const result  = await dbhelpers.execute('deleteUser', { userID })
//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         message: 'User not found or already deleted.',
//       });
//     }

//     return res.status(200).json({
//       message: 'User deleted successfully',
//     });
//   } catch (error) {
//     return res.json({
//       error: error
//     })
//   }
// }


export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const result = await dbhelpers.execute('deleteUser', { userID });

    if (result.recordset[0].Result === 'User not found') {
      return res.status(404).json({
        message: 'User not found.',
      });
    } else if (result.recordset[0].Result === 'User deleted successfully') {
      return res.status(200).json({
        message: 'User deleted successfully',
      });
    } else if (result.recordset[0].Result === 'User already deleted') {
      return res.status(200).json({
        message: 'User already deleted',
      });
    } else {
      return res.status(500).json({
        message: 'Unexpected result from the database',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: 'Internal Server Error',
    });
  }
};





export const initiatePasswordResetController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await dbhelpers.execute('getUserByEmail', { email });

    if (!user.recordset || user.recordset.length === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const resetToken = generateResetToken();
    console.log(resetToken);

    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    await dbhelpers.execute('SetResetTokenAndExpiration', {
      email,
      resetToken,
      expiryTime: expiration.toISOString(),
    });

    //  let newToken= sendResetTokenByEmail(email, resetToken);
    // console.log(newToken);

    res.status(200).json({ message: 'Reset token sent successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const resetPasswordControllers = async (req: Request, res: Response) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    console.log("reset token ", resetToken);
    newPassword
    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await dbhelpers.execute('ResetPassword', {
      email,
      resetToken,
      newPassword: hashedPassword,
    });

    console.log("rows affected", result.rowsAffected);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Password reset successful.' });
      return;
    }

    console.log("Record sets", result.recordset);

    if (result.recordset && result.recordset.length > 0) {
      const message = result.recordset[0].message;
      console.log("message:", message);

      if (message === 'Password updated successfully') {
        res.status(200).json({ message: 'Password reset successful' });
      } else if (message === 'Invalid token') {
        res.status(400).json({ message: 'Invalid reset token' });
      } else if (message === 'Invalid email') {
        res.status(400).json({ message: 'Invalid email' });
      } else {
        res.status(500).json({
          message: 'Error resetting password',
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}




// export const followUserController = async (req: Request, res: Response) => {
//   try {
//     const { userID, followingUserID } = req.body;

//     // Validate request parameters if needed

//     const followingID = v4();
//     // const createdAt = getCurrentTimestamp(); 

//     const result = await dbhelpers.execute('followUser', { followingID, userID, followingUserID});

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         message: 'User or following user does not exist. Follow not performed.',
//       });
//     }

//     return res.status(200).json({
//       message: 'User followed successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal Server Error',
//     });
//   }
// };


// export const unfollowUserController = async (req: Request, res: Response) => {
//   try {
//     const { userID, followingUserID } = req.body;

//     // Validate request parameters if needed

//     const result = await dbhelpers.execute('unfollowUser', { userID, followingUserID });

//     if (result.rowsAffected[0] === 0) {
//       return res.status(404).json({
//         message: 'User or following user does not exist. Unfollow not performed.',
//       });
//     }

//     return res.status(200).json({
//       message: 'User unfollowed successfully',
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal Server Error',
//     });
//   }
// };



// export const getFollowersForUserController = async (req: Request, res: Response) => {
//   try {
//     const { userID } = req.params; 

//     const result = await dbhelpers.execute('getFollowersForUser', { userID });

   
//     if (result.recordset.length === 0) {
//       return res.status(404).json({
//         message: 'No followers found for the user',
//       });
//     }

//     return res.status(200).json({
//       followers: result.recordset,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       error: 'Internal Server Error',
//     });
//   }
// };



// export const getFollowersControllers = async (req: Request, res: Response) => {
//   try {
//     let  followedUserID  = req.params.ID;

//     let followers = (
//       await dbhelpers.execute("getFollowers", {
//         followedUserID,
//       })
//     ).recordset;

//     return res.status(200).json({
//       followers: followers,
//     });
//   } catch (error) {
//     return res.json({
//       error: error,
//     });
//   }
// };

// //GET FOLLOWINGS
// export const getFollowingsControllers = async (req: Request, res: Response) => {
//   try {
//     let  followingUserID  = req.params.ID;

//     let followers = (
//       await dbhelpers.execute("getFollowings", {
//         followingUserID,
//       })
//     ).recordset;

//     return res.status(200).json({
//       followings: followers,
//     });
//   } catch (error) {
//     return res.json({
//       error: error,
//     });
//   }
// };


// export const followUnfollowUserControllers = async (req: Request, res: Response) => {
//   console.log(req.body);

//   try {
//     const followerID = v4();

//     const { followingUserID, followedUserID } = req.body;
//     const relationsexists = (
//       await query(
//         `SELECT * FROM Followers WHERE followingUserID = '${followingUserID}' AND followedUserID= '${followedUserID}'`
//       )
//     ).recordset;

//     if (!isEmpty(relationsexists)) {
//       let result = await dbhelpers.execute("unfollowUser", {
//         followingUserID,
//         followedUserID,
//       });

//       if (result.rowsAffected[0] === 0) {
//         return res.status(404).json({
//           message: "Something went wrong, user not followed",
//         });
//       } else {
//         return res.status(200).json({
//           message: "User Unfollowed",
//         });
//       }
//     } else {
//       let result = await dbhelpers.execute("followUser", {
//         followerID,
//         followingUserID,
//         followedUserID,
//       });

//       if (result.rowsAffected[0] === 0) {
//         return res.status(404).json({
//           message: "Something went wrong, user not followed",
//         });
//       } else {
//         return res.status(200).json({
//           message: "User Followed",
//         });
//       }
//     }
//   } catch (error) {
//     console.log(error);

//     return res.json({
//       error,
//     });
//   }
// };





export const followUnfollowUser = async (req: Request, res: Response) => {
  try {
    const { followedUserID, followingUserID } = req.body;

    // Check follow status
    const checkFollowStatusResult = await dbhelpers.execute("checkFollowStatus", {
      followedUserID,
      followingUserID,
    });

    const isFollowing = checkFollowStatusResult.recordset[0].isFollowing;

    console.log(isFollowing);
    
    if (isFollowing) {
      
      await dbhelpers.execute("unfollowUser", { followedUserID, followingUserID });
      return res.status(200).send({ message: "User unfollowed successfully", isFollowing: false });
    } else {
      // If not following, follow
      await dbhelpers.execute("followUser", { followedUserID, followingUserID });
      return res.status(200).send({ message: "User followed successfully", isFollowing: true });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};


export const getFollowers = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const result = await dbhelpers.execute("getFollowers", { userID });

    return res.status(200).send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};



export const getFollowings = async (req: Request, res: Response) => {
  try {
    const  {userID}  = req.params

    const result = await dbhelpers.execute("getFollowings", { userID });

    return res.status(200).send(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
