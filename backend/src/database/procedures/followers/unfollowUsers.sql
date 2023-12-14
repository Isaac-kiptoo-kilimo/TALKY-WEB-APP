CREATE OR ALTER PROCEDURE unfollowUser
    @userID VARCHAR(255),
    @followerUserID VARCHAR(255)
AS
BEGIN
    -- Check if the user and follower user exist before unfollowing
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @followerUserID)
    BEGIN
        -- Check if the user is followed by the follower user
        IF EXISTS (SELECT 1 FROM Followers WHERE userID = @userID AND followerUserID = @followerUserID)
        BEGIN
            -- Unfollow the user
            DELETE FROM Followers
            WHERE userID = @userID AND followerUserID = @followerUserID;

            SELECT 'User unfollowed successfully' AS Result;
        END
        ELSE
        BEGIN
            -- User is not followed by the follower user
            SELECT 'User is not currently followed by the specified follower user' AS Result;
        END
    END
    ELSE
    BEGIN
        -- User or follower user doesn't exist
        SELECT 'User or follower user does not exist. Unfollow not performed.' AS Result;
    END
END;
