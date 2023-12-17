CREATE OR ALTER PROCEDURE getAllRepliesForComment
    @commentID VARCHAR(255)
AS
BEGIN
    -- Retrieve all replies for a specific comment
    SELECT replyID, userID, commentID, text, createdAt
    FROM Replies
    WHERE commentID = @commentID AND isDeleted = 0;
END;
