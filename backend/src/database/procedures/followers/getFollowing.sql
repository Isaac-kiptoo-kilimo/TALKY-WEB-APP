
CREATE OR ALTER PROCEDURE getFollowings
    @followingUserID VARCHAR(255)
AS
BEGIN
    SELECT followerID
    FROM Followers
    WHERE followingUserID = @followingUserID;
END