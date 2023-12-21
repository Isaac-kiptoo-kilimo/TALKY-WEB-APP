CREATE OR ALTER PROCEDURE getLikesCountForPost
    @postID VARCHAR(255)
AS
BEGIN
    -- Retrieve likes count for a specific post
    SELECT COUNT(*) AS likesCount
    FROM Likes
    WHERE postID = @postID;
END;

GO
CREATE OR ALTER PROCEDURE getLikesCountForPost
    @postID VARCHAR(255)
AS
BEGIN
    SELECT P.*, 
           COUNT(L.postID) AS likesCount
    FROM Posts AS P
    LEFT JOIN Likes AS L ON P.postID = L.postID
    WHERE P.postID = @postID
    GROUP BY P.postID, P.userID, P.caption, P.createdAt; -- Include all columns from Posts table
END;
