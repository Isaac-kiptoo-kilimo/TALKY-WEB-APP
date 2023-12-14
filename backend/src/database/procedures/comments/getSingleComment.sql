CREATE OR ALTER PROCEDURE getComment
    @commentID VARCHAR(255)
AS
BEGIN
    -- Retrieve the comment
    SELECT commentID, userID, postID, content, createdAt
    FROM Comments
    WHERE commentID = @commentID;
END;