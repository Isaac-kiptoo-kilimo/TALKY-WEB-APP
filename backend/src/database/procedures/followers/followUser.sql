CREATE OR ALTER PROCEDURE followUser(
    @followerID VARCHAR(255),
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
)
AS
BEGIN
    -- Check if the users exist before adding a follow relationship
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @followedUserID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @followingUserID)
    BEGIN
        -- Insert the follow relationship
        INSERT INTO Followers (followerID, followedUserID, followingUserID)
        VALUES (@followerID, @followedUserID, @followingUserID);

        SELECT 'User followed successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User or following user doesn't exist
        SELECT 'User or following user does not exist. Follow not added.' AS Result;
    END
END;
