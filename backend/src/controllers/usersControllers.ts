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
        error: error.details[0].message

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

    //   const resultMessage = results.recordset[0].Result;
    // console.log(resultMessage);
    // console.log(results);

    const result = results.rowsAffected[0];
    
// console.log(result);

    // if (resultMessage.includes('User registered successfully')) {
    //   return res.status(201).json({
    //     message: 'User Registered Successfully'
    //   });
    // } else {
    //   return res.status(400).json({
    //     message: resultMessage
    //   });
    // }

    if (result===1) {
          return res.status(201).json({
              message: 'User Registered Successfully'
          });
      } else {
          return res.status(400).json({
              message: results.recordset[0].Result
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
        error: error.details[0].message
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
    if (!user) {
      return res.status(404).json({
        message: "User Not Found"
      })
    }

    const pool = await mssql.connect(dbConfig);
    const userID = user.userID
    // console.log(userID);

    const result = await dbhelpers.execute('GetUserDetails', { userID });

    const userDetails = result.recordset
    // console.log(userDetails);
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
    // console.log(userID);
    if (!userID) return res.status(403).send({ message: "Id is required" });


    const result = await dbhelpers.execute('getSingleUser', { userID });

    res.json(result.recordset);

  } catch (error) {
    return res.json(400).json({
      error: error
    })
  }
};





export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { userID } = req.params;

    const result = await dbhelpers.execute('deleteUser', { userID });
    // console.log(result.recordset[0].Result);

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
    // console.log(resetToken);

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
    // console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const resetPasswordControllers = async (req: Request, res: Response) => {
  try {
    const { email, resetToken, newPassword } = req.body;
    // console.log("reset token ", resetToken);
    newPassword
    // Hash the new password before updating
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const result = await dbhelpers.execute('ResetPassword', {
      email,
      resetToken,
      newPassword: hashedPassword,
    });

    // console.log("rows affected", result.rowsAffected);

    if (result.rowsAffected[0] > 0) {
      res.status(200).json({ message: 'Password reset successful.' });
      return;
    }

    // console.log("Record sets", result.recordset);

    if (result.recordset && result.recordset.length > 0) {
      const message = result.recordset[0].message;
      // console.log("message:", message);

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
    // console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}






export const followUnfollowUser = async (req: Request, res: Response) => {
  try {
    const { followedUserID, followingUserID } = req.body;

    // Check follow status
    const checkFollowStatusResult = await dbhelpers.execute("checkFollowStatus", {
      followedUserID,
      followingUserID,
    });

    const isFollowing = checkFollowStatusResult.recordset[0].isFollowing;

    // console.log(isFollowing);
    
    if (isFollowing) {
      
      await dbhelpers.execute("unfollowUser", { followedUserID, followingUserID });
      return res.status(200).send({ message: "User unfollowed successfully", isFollowing: false });
    } else {
      // If not following, follow
      await dbhelpers.execute("followUser", { followedUserID, followingUserID });
      return res.status(200).send({ message: "User followed successfully", isFollowing: true });
    }
  } catch (error) {
    // console.error(error);
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
    // console.error(error);
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
    // console.error(error);
    res.status(500).send({
      error: (error as Error).message,
      message: "Internal Server Error",
    });
  }
};
