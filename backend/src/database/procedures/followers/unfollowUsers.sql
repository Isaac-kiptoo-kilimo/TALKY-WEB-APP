
GO
CREATE OR ALTER PROCEDURE unfollowUser
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user is following
    IF EXISTS (SELECT 1 FROM Followers WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID AND isFollowing = 1)
    BEGIN
        -- Set isFollowing to 0 and then delete the record
        UPDATE Followers
        SET isFollowing = 0
        WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;

        -- Delete the record from Followers table
        DELETE FROM Followers
        WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;
    END;
END;


GO
CREATE OR ALTER PROCEDURE unfollowUser
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user is currently following
    IF EXISTS (SELECT 1 FROM Followers WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID)
    BEGIN
        -- Remove the follow relationship
        DELETE FROM Followers
        WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;

        -- Decrease followersCount for the followed user
        UPDATE Users
        SET followersCount = followersCount - 1
        WHERE userID = @followedUserID;

        -- Decrease followingCount for the follower user
        UPDATE Users
        SET followingCount = followingCount - 1
        WHERE userID = @followingUserID;
    END;
    
END;
