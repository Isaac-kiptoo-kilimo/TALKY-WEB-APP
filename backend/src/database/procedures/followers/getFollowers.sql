CREATE OR ALTER PROCEDURE getUserFollowers
    @userID VARCHAR(255)
AS
BEGIN
    -- Retrieve user's followers
    SELECT followerID, userID, followerUserID
    FROM Followers
    WHERE userID = @userID;
END;
