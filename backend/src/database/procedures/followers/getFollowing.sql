
-- CREATE OR ALTER PROCEDURE getFollowings
--     @followingUserID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT followerID
--     FROM Followers
--     WHERE followingUserID = @followingUserID;
-- END

DROP PROCEDURE getFollowings

GO

CREATE OR ALTER PROCEDURE getFollowings
    @userID VARCHAR(255)
AS
BEGIN
    SELECT followingUserID
    FROM Followers
    WHERE followedUserID = @userID AND Followers.isFollowing = 1;
END;

GO

CREATE OR ALTER PROCEDURE getFollowings
    @userID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Users.*
    FROM Users
    INNER JOIN Followers ON Users.userID = Followers.followingUserID
    WHERE Followers.followedUserID = @userID AND Followers.isFollowing = 1;
END;

-- CREATE OR ALTER PROCEDURE getFollowings
--     @followedUserID VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     SELECT Users.* 
--     FROM Users
--     INNER JOIN Followers ON Users.userID = Followers.followingUserID
--     WHERE Followers.followedUserID = @followedUserID AND Followers.isFollowing = 1;
-- END;


