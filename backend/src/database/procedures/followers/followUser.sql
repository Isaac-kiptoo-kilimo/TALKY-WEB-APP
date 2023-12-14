CREATE OR ALTER PROCEDURE followUser
    @followerID VARCHAR(255),
    @userID VARCHAR(255),
    @followerUserID VARCHAR(255)
AS
BEGIN
    -- Check if the user and follower user exist before following
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @followerUserID)
    BEGIN
        -- Check if the user is not already followed by the follower user
        IF NOT EXISTS (SELECT 1 FROM Followers WHERE userID = @userID AND followerUserID = @followerUserID)
        BEGIN
            -- Follow the user
            INSERT INTO Followers (followerID, userID, followerUserID)
            VALUES (@followerID, @userID, @followerUserID);

            SELECT 'User followed successfully' AS Result;
        END
        ELSE
        BEGIN
            -- User is already followed by the follower user
            SELECT 'User is already followed by the specified follower user' AS Result;
        END
    END
    ELSE
    BEGIN
        -- User or follower user doesn't exist
        SELECT 'User or follower user does not exist. Follow not performed.' AS Result;
    END
END;
