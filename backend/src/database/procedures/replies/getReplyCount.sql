CREATE OR ALTER PROCEDURE getReplyCountForComment
    @commentID VARCHAR(255)
AS
BEGIN
    
    SELECT COUNT(*) AS replyCount
    FROM Replies
    WHERE commentID = @commentID;
END;
