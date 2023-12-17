CREATE OR ALTER PROCEDURE deleteReply
    @replyID VARCHAR(255)
AS
BEGIN
    -- Soft delete the reply by updating the isDeleted flag
    UPDATE Replies
    SET isDeleted = 1
    WHERE replyID = @replyID;

    SELECT 'Reply deleted successfully' AS Result;
END;
