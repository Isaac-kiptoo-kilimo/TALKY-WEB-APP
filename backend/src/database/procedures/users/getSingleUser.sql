
CREATE OR ALTER PROCEDURE getSingleUser(
    @userID	varchar(100)
)

AS
BEGIN
	SELECT	userID,email,fullName,username,role,profileImage
	FROM Users WHERE userID= @userID
END
