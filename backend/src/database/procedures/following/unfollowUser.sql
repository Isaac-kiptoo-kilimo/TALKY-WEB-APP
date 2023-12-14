CREATE OR ALTER PROCEDURE unfollowUser
    @userID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    -- Check if the user and following user exist before unfollowing
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @followingUserID)
    BEGIN
        -- Check if the user is following the following user
        IF EXISTS (SELECT 1 FROM Following WHERE userID = @userID AND followingUserID = @followingUserID)
        BEGIN
            -- Unfollow the user
            DELETE FROM Following
            WHERE userID = @userID AND followingUserID = @followingUserID;

            SELECT 'User unfollowed successfully' AS Result;
        END
        ELSE
        BEGIN
            -- User is not following the following user
            SELECT 'User is not currently following the specified user' AS Result;
        END
    END
    ELSE
    BEGIN
        -- User or following user doesn't exist
        SELECT 'User or following user does not exist. Unfollow not performed.' AS Result;
    END
END;
