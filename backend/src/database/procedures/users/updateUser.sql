CREATE OR ALTER PROCEDURE updateUser(
    @userID VARCHAR (255),
    @fullName VARCHAR(200),
    @username VARCHAR(200),
    @email VARCHAR(250),
    @profileImage VARCHAR(1000)
)
AS BEGIN
    UPDATE Users SET fullName=@fullName,username=@username,email=@email,profileImage=@profileImage WHERE userID = @userID;

END