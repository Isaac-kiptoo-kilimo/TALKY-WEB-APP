CREATE OR ALTER PROCEDURE updateUser(
    @userID VARCHAR (255),
    @fullName VARCHAR(200),
    @username VARCHAR(200),
    @profileImage VARCHAR(1000)
)
AS BEGIN
    UPDATE Users SET fullName=@fullName,username=@username,profileImage=@profileImage WHERE userID = @userID;

END