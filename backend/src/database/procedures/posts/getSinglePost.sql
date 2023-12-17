CREATE OR ALTER PROCEDURE GetPost
    @postID VARCHAR(255)
AS
BEGIN
    -- Retrieve a single post based on postID
    SELECT postID, userID, caption, createdAt
    FROM Posts
    WHERE postID = @postID;
END;
