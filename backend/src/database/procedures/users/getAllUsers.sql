
CREATE OR ALTER PROCEDURE getAllUsers

  @loggedInUserID VARCHAR(255)
AS
BEGIN
    SELECT *
    FROM Users
    WHERE role != 'Admin'
        AND userID != @loggedInUserID;
END; 



GO
CREATE OR ALTER PROCEDURE getAllUsers
  @loggedInUserID VARCHAR(255)
AS
BEGIN
    SELECT
        U.*,
        CASE
            WHEN F.followingUserID IS NOT NULL THEN 1
            ELSE 0
        END AS isFollowing
    FROM Users U
    LEFT JOIN Followers F ON U.userID = F.followedUserID AND F.followingUserID = @loggedInUserID
    WHERE U.role != 'Admin' AND U.userID != @loggedInUserID;
END;


