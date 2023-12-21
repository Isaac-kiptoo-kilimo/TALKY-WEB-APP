import mssql from 'mssql'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 } from 'uuid'
import { Request, Response } from 'express'
import { deleteUserController, fetchAllUsersControllers, getSingleUserController, loginUserControllers, registerUserControllers, updateUserControllers, } from './usersControllers'

describe("User Registration", () => {

    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    })

    it("successfully registers a user", async () => {
        const req = {
            body: {
                fullName: "Isaac Omondi",
                username: "@Omondi",
                email: "isaac@gmail.com",
                password: "12345678@Io"
            }
        }


        jest.spyOn(bcrypt, 'hash').mockResolvedValueOnce("hashedpass123" as never)

        const mockedInput = jest.fn().mockReturnThis()

        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] })

        const mockedRequest = {
            input: mockedInput,
            execute: mockedExecute
        }

      

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        }



        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never)

        await registerUserControllers(req as Request, res as any)

        // Assertions

        expect(res.json).toHaveBeenCalledWith({ message: 'User Registered Successfully' })
        expect(res.status).toHaveBeenCalledWith(201)
        expect(mockedInput).toHaveBeenCalledWith('password', mssql.VarChar, 'hashedpass123')
        expect(mockedInput).toHaveBeenCalledWith('fullName', mssql.VarChar, 'Isaac Omondi')
        expect(mockedInput).toHaveBeenCalledWith('username', mssql.VarChar, '@Omondi')
        expect(mockedInput).toHaveBeenCalledWith('email', mssql.VarChar, 'isaac@gmail.com')
    })

})


describe("Testing Login Functionality", () => {

    let res: any

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        }
    })

    it('Returns an error if email or password is empty', async () => {
        const req = {
            body: {
                email: "",
                password: ""
            }
        }

        await loginUserControllers(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is not allowed to be empty" })

    })

    it('Returns an error if email or password is missing', async () => {
        const req = {
            body: {

            }
        }

        await loginUserControllers(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({ "error": "\"email\" is required" })

    })

    it("Returns an error if email is not in database", async () => {
        const req = {
            body: {
                email: "emmanuelm1anu@gmail.com",
                password: "12345678@Em"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [] })
        } as never)

        await loginUserControllers(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({ error: "Email not found" })
    })

    it("Handles incorrect password scenario", async () => {
        const req = {
            body: {
                email: "emanuelKip@gmail.com",
                password: "12345678@EM"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                recordset: [{
                    email: 'emanuelKip@gmail.com',
                    password: 'hashedPwd'
                }]
            })
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false as never)

        await loginUserControllers(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({ error: "Incorrect Password" })
    })

    it("successfully logs in a user and returns a token", async () => {

        let expectedUser = {
            userID: "7fda9578-0147-49f3-a90e-a34a10cf13ef",
            fullName: "Emmanuel Kipsang",
            email: "emanuelKip@gmail.com",
            password: "$2b$05$9HCBX0QnlqDQQTg6dnCwuuTa97.aiYa1e.Svg1xKUscNDTYZ6ydDi",
            role: "user",
            hasBooked: 1,
            resetPassword: null
        }

        const req = {
            body: {
                email: expectedUser.email,
                password: "12345678@Em"
            }
        }

        jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({ recordset: [expectedUser] })
        } as never)

        jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true as never)

        jest.spyOn(jwt, 'sign').mockReturnValueOnce("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0YzMwYzE4MS0zNmE5LTQ3MTUtYWVlZS0wOTA2ZTEwNjliMDEiLCJmdWxsTmFtZSI6Ik1hbnUiLCJlbWFpbCI6ImVtbWFudWVsbWFudUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImhhc0Jvb2tlZCI6MCwicmVzZXRQYXNzd29yZCI6MCwiaWF0IjoxNzAwNzczMjg0LCJleHAiOjE3MDA5NDYwODR9.9zZD1KEtt5kIsbD6u9RWZuit9pqT5T31QazznTVaxZg" as never)

        await loginUserControllers(req as Request, res)

        expect(res.json).toHaveBeenCalledWith({
            message: "User Logged in successfully",
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI0YzMwYzE4MS0zNmE5LTQ3MTUtYWVlZS0wOTA2ZTEwNjliMDEiLCJmdWxsTmFtZSI6Ik1hbnUiLCJlbWFpbCI6ImVtbWFudWVsbWFudUBnbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImhhc0Jvb2tlZCI6MCwicmVzZXRQYXNzd29yZCI6MCwiaWF0IjoxNzAwNzczMjg0LCJleHAiOjE3MDA5NDYwODR9.9zZD1KEtt5kIsbD6u9RWZuit9pqT5T31QazznTVaxZg"
        })
    })

})



describe("User Update and Details", () => {
    let res: any;

    beforeEach(() => {
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    it("Updates user fullname and username", async () => {
        const req = {
            params: {
                userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2"
            },
            body: {
                fullName: "caleb",
                username: "@caleb12",
                profileImage: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="       
                 }
        };


        const mockedExecute = jest.fn().mockResolvedValue({ rowsAffected: [1] });

        const mockedRequest = {
            input: jest.fn().mockReturnThis(),
            execute: mockedExecute
        };

        const mockedPool = {
            request: jest.fn().mockReturnValue(mockedRequest)
        };

        jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

        await updateUserControllers(req as any, res as any);

        expect(res.json).toHaveBeenCalledWith({ message: "User updated successfully" });
    });
 
   
})



// describe("Get user Details", () => {
//     let res: any;

//     beforeEach(() => {
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis()
//         };
//     });

//     it("Gets all users", async () => {
//         const req = {};

//         const mockedUsers = [
//             {
//                 userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2",
//                 fullName: "caleb",
//                 username: "@caleb12",
//                 email: "caleb@gmail.com",
//                 password: "$2b$05$ynNbVhWBUBLXtl6iIjBoTObi2QVPgT7WpR8nEtgJMfcgbgy.UdoTu",
//                 role: "user",
//                 resetToken: null,
//                 expiryTime: null,
//                 welcomed: true,
//                 isDeleted: false,
//                 isSend: false,
//                 followersCount: 1,
//                 followingCount: 0,
//                 profileImage: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//             },
//             {
//                 userID: "37d8ade4-27fa-4bbc-a4f9-2bd2650bf062",
//                 fullName: "Daniel Kitheka",
//                 username: "_@Dankitheka254",
//                 email: "gamemy17745@gmail.com",
//                 password: "$2b$05$TxamGacVZXcDx1jXJw1nR.Ng0lqtb.M7Wz/vG1n558sUUbkeoTtDS",
//                 role: "user",
//                 resetToken: null,
//                 expiryTime: null,
//                 welcomed: false,
//                 isDeleted: false,
//                 isSend: false,
//                 followersCount: 0,
//                 followingCount: 0,
//                 profileImage: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//             },
//         ];

//         jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
//             request: jest.fn().mockReturnThis(),
//             execute: jest.fn().mockResolvedValueOnce({ recordset: mockedUsers })
//         } as never);

//         await fetchAllUsersControllers(req as any, res as any);

//         expect(res.status).toHaveBeenCalledWith(201);
//         expect(res.json).toHaveBeenCalledWith(mockedUsers);
//     });


//     it("Gets single user", async () => {
//         const req = {
//             params: {
//                 userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2"
//             }
//         };

//         const mockedOneUser = {
//             userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2",
//             fullName: "caleb",
//             username: "@caleb12",
//             email: "caleb@gmail.com",
//             password: "$2b$05$ynNbVhWBUBLXtl6iIjBoTObi2QVPgT7WpR8nEtgJMfcgbgy.UdoTu",
//             role: "user",
//             resetToken: null,
//             expiryTime: null,
//             welcomed: true,
//             isDeleted: false,
//             isSend: false,
//             followersCount: 1,
//             followingCount: 0,
//             profileImage: "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
//         }


//         jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
//             request: jest.fn().mockReturnThis(),
//             input: jest.fn().mockReturnThis(),
//             execute: jest.fn().mockResolvedValueOnce({ recordset: [mockedOneUser] })
//         } as never);

//         await getSingleUserController(req as any, res as any);

//         expect(res.json).toHaveBeenCalledWith([mockedOneUser]);
//     });


// })



// describe("Deleting user", () => {
//     let res: any;

//     beforeEach(() => {
//         res = {
//             status: jest.fn().mockReturnThis(),
//             json: jest.fn().mockReturnThis()
//         };
//     });
   
//     it("Deletes user", async () => {
//         const req = {
//             params: {
//                 userID: "0cb03fa5-9ad4-4b18-a693-32a92befedf2"
//             }
//         };

//         const mockedExecute = jest.fn().mockResolvedValue({ recordset: [{ Result: 'User deleted successfully' }] });

//         const mockedRequest = {
//             input: jest.fn().mockReturnThis(),
//             execute: mockedExecute
//         };

//         const mockedPool = {
//             request: jest.fn().mockReturnValue(mockedRequest)
//         };

//         jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

//         await deleteUserController(req as any, res as any);

//         expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
//     });


//     it('should return 404 if user not found', async () => {

//         const req = {
//             params: {
//                 userID: "dhhs1244563673773778"
//             }
//         };

//         const mockedExecute = jest.fn().mockResolvedValue({ recordset: [{ Result: 'User not found' }] });

//         const mockedRequest = {
//             input: jest.fn().mockReturnThis(),
//             execute: mockedExecute
//         };

//         const mockedPool = {
//             request: jest.fn().mockReturnValue(mockedRequest)
//         };

//         jest.spyOn(mssql, 'connect').mockResolvedValue(mockedPool as never);

//         await deleteUserController(req as any, res as any);

//         expect(res.json).toHaveBeenCalledWith({ message: 'User not found.' });
//     });



// })
