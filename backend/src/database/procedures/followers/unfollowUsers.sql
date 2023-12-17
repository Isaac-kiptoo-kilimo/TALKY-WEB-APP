CREATE OR ALTER PROCEDURE unfollowUser
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    -- Delete the follow relationship
    DELETE FROM Followers
    WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;

    SELECT 'User unfollowed successfully' AS Result;
END;


