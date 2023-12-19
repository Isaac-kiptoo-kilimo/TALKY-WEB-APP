-- CREATE OR ALTER PROCEDURE checkFollowStatus
--     @followedUserID VARCHAR(255),
--     @followingUserID VARCHAR(255),
--     @isFollowing BIT
-- AS
-- BEGIN
--     SET @isFollowing = CASE
--         WHEN EXISTS (
--             SELECT 1
--             FROM Followers
--             WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID
--         ) THEN 1
--         ELSE 0
--     END;
-- END;


CREATE OR ALTER PROCEDURE checkFollowStatus
    @followingUserID VARCHAR(255),
    @followedUserID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @isFollowing BIT;

    SELECT @isFollowing = isFollowing
    FROM Followers
    WHERE followingUserID = @followingUserID AND followedUserID = @followedUserID;

    SELECT @isFollowing AS isFollowing;
END;
