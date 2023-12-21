import { Router } from "express";
import { checkCredentials,  deleteUserController, fetchAllAvailableUsersControllers, fetchAllUsersControllers,  followUnfollowUser,   getFollowers,   getFollowings,   getSingleUserController, getUserDetails, initiatePasswordResetController, loginUserControllers, registerUserControllers, resetPasswordControllers,    updateUserControllers } from "../controllers/usersControllers";
import { verifyToken } from "../middlewares/verifyToken";


const userRouter=Router()

userRouter.post('/register', registerUserControllers)
userRouter.post('/login', loginUserControllers)
userRouter.put('/update/:userID', updateUserControllers)
userRouter.get('/userDetails', verifyToken , getUserDetails)
userRouter.get('/all/:loggedInUserID', verifyToken , fetchAllUsersControllers)
userRouter.get('/all', verifyToken , fetchAllAvailableUsersControllers)
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);
userRouter.get('/singleUser/:userID',verifyToken,getSingleUserController)
userRouter.delete('/delete/:userID', deleteUserController)
userRouter.post('/initiate-password-reset', initiatePasswordResetController);
userRouter.post('/reset-password', resetPasswordControllers);
// userRouter.get("/getFollowers/:ID", getFollowersControllers);
// userRouter.get("/getFollowings/:ID", getFollowingsControllers);
// userRouter.post("/followUnfollowUser", followUnfollowUserControllers);

userRouter.post('/followUnfollowUser', followUnfollowUser);

userRouter.get('/getFollowers/:userID', getFollowers);

userRouter.get('/getFollowings/:userID', getFollowings);

export default userRouter
