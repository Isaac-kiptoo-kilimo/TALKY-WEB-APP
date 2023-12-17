
CREATE OR ALTER PROCEDURE getFollowers
    @followedUserID VARCHAR(255)
AS
BEGIN
    SELECT followerID
    FROM Followers
    WHERE followedUserID = @followedUserID;
END

