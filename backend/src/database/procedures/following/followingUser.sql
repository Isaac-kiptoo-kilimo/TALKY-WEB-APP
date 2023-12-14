CREATE OR ALTER PROCEDURE followUser
    @followingID VARCHAR(255),
    @userID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    -- Check if the user and following user exist before following
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @followingUserID)
    BEGIN
        -- Check if the user is not already following the following user
        IF NOT EXISTS (SELECT 1 FROM Following WHERE userID = @userID AND followingUserID = @followingUserID)
        BEGIN
            -- Follow the user
            INSERT INTO Following (followingID, userID, followingUserID)
            VALUES (@followingID, @userID, @followingUserID);

            SELECT 'User followed successfully' AS Result;
        END
        ELSE
        BEGIN
            -- User is already following the following user
            SELECT 'User is already following the specified user' AS Result;
        END
    END
    ELSE
    BEGIN
        -- User or following user doesn't exist
        SELECT 'User or following user does not exist. Follow not performed.' AS Result;
    END
END;
