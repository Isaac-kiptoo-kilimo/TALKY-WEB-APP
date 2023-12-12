CREATE OR ALTER PROCEDURE GetUserDetails(
    @userID VARCHAR(100)
)
AS
BEGIN
    SELECT
        userID,
        fullName,
        username,
        email,
        role,
        profileImage
    FROM
        Users
    WHERE
        userID = @userID;
END;


