
-- CREATE OR ALTER PROCEDURE getFollowers
--     @followedUserID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT followerID
--     FROM Followers
--     WHERE followedUserID = @followedUserID;
-- END

DROP PROCEDURE getFollowers

GO

-- CREATE OR ALTER PROCEDURE getFollowers
--     @userID VARCHAR(255)
-- AS
-- BEGIN
--     SELECT followedUserID
--     FROM Followers
--     WHERE followingUserID = @userID ;
-- END;

GO

CREATE OR ALTER PROCEDURE getFollowers
    @userID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT Users.*
    FROM Users
    INNER JOIN Followers ON Users.userID = Followers.followedUserID
    WHERE Followers.followingUserID = @userID AND Followers.isFollowing = 1;
END;



-- CREATE OR ALTER PROCEDURE getFollowers
--     @followerID VARCHAR(255)
-- AS
-- BEGIN
--     SET NOCOUNT ON;

--     SELECT Users.* 
--     FROM Users
--     INNER JOIN Followers ON Users.userID = Followers.followedUserID
--     WHERE Followers.followingUserID = @followerID AND Followers.isFollowing = 1;
-- END;
