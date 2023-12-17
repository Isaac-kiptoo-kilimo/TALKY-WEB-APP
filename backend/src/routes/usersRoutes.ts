import { Router } from "express";
import { checkCredentials,  deleteUserController, fetchAllUsersControllers,  followUnfollowUserControllers,  getFollowersControllers,  getFollowingsControllers,  getSingleUserController, getUserDetails, initiatePasswordResetController, loginUserControllers, registerUserControllers, resetPasswordControllers,    updateUserControllers } from "../controllers/usersControllers";
import { verifyToken } from "../middlewares/verifyToken";


const userRouter=Router()

userRouter.post('/register', registerUserControllers)
userRouter.post('/login', loginUserControllers)
userRouter.put('/update/:userID', updateUserControllers)
userRouter.get('/userDetails', verifyToken , getUserDetails)
userRouter.get('/all', verifyToken , fetchAllUsersControllers)
userRouter.get('/checkUserDetails', verifyToken, checkCredentials);
userRouter.get('/singleUser/:userID',verifyToken,getSingleUserController)
userRouter.delete('/delete/:userID',verifyToken, deleteUserController)
userRouter.post('/initiate-password-reset', initiatePasswordResetController);
userRouter.post('/reset-password', resetPasswordControllers);
userRouter.get("/getFollowers/:ID", getFollowersControllers);
userRouter.get("/getFollowings/:ID", getFollowingsControllers);
userRouter.post("/followUnfollowUser", followUnfollowUserControllers);



export default userRouter
