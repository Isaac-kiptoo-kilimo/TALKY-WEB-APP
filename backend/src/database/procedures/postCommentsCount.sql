CREATE OR ALTER PROCEDURE getCommentCountForPost
    @postID VARCHAR(255)
AS
BEGIN
    -- Retrieve the count of comments for a specific post
    SELECT commentsCount
    FROM postCommentCount
    WHERE postID = @postID;
END;
