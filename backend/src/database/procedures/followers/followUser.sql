

GO
-- CREATE OR ALTER PROCEDURE followUser
--     @followedUserID VARCHAR(255),
--     @followingUserID VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     -- Check if the user is not already following
--     IF NOT EXISTS (SELECT 1 FROM Followers WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID)
--     BEGIN
--         INSERT INTO Followers (followedUserID, followingUserID, isFollowing)
--         VALUES (@followedUserID, @followingUserID, 1); -- Set isFollowing to 1 (true)
--     END;
-- END;

CREATE OR ALTER PROCEDURE followUser
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user is not already following
    IF NOT EXISTS (SELECT 1 FROM Followers WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID)
    BEGIN
        -- Insert into Followers
        INSERT INTO Followers (followedUserID, followingUserID, isFollowing)
        VALUES (@followedUserID, @followingUserID, 1); -- Set isFollowing to 1 (true)

        -- Increase followersCount for the followed user
        UPDATE Users
        SET followersCount = followersCount + 1
        WHERE userID = @followedUserID;

        -- Increase followingCount for the follower user
        UPDATE Users
        SET followingCount = followingCount + 1
        WHERE userID = @followingUserID;
    END;
    
END;

