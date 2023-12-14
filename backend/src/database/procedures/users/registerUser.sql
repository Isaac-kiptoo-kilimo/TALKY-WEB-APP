CREATE OR ALTER PROCEDURE registerUser(
    @userID VARCHAR(255),
    @fullName VARCHAR(200),
    @username VARCHAR(200),
    @email VARCHAR(250),
    @password VARCHAR(100)
)

AS
BEGIN
     INSERT INTO Users(userID,fullName,username,email,password)
     VALUES(@userID,@fullName,@username,@email,@password)
END