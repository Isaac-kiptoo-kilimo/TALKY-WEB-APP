CREATE OR ALTER PROCEDURE getLikesCountForPost
    @postID VARCHAR(255)
AS
BEGIN
    -- Retrieve likes count for a specific post
    SELECT COUNT(*) AS likesCount
    FROM Likes
    WHERE postID = @postID;
END;
