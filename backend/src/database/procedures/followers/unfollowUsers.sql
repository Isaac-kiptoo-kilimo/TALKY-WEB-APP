-- CREATE OR ALTER PROCEDURE unfollowUser
--     @followedUserID VARCHAR(255),
--     @followingUserID VARCHAR(255)
-- AS
-- BEGIN
--     -- Delete the follow relationship
--     DELETE FROM Followers
--     WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;

--     SELECT 'User unfollowed successfully' AS Result;
-- END;

DROP PROCEDURE unfollowUser
go
-- CREATE OR ALTER PROCEDURE unfollowUser
--     @followedUserID VARCHAR(255),
--     @followingUserID VARCHAR(255)
-- AS
-- BEGIN
--     DELETE FROM Followers
--     WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID;
-- END;

CREATE OR ALTER PROCEDURE unfollowUser
    @followedUserID VARCHAR(255),
    @followingUserID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user is following
    IF EXISTS (SELECT 1 FROM Followers WHERE followedUserID = @followedUserID AND followingUserID = @followingUserID AND isFollowing = 1)
    BEGIN
        UPDATE Followers
        SET isFollowing = 0
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
