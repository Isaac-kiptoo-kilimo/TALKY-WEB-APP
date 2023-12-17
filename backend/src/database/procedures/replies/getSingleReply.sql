CREATE OR ALTER PROCEDURE getSingleReply
    @replyID VARCHAR(255)
AS
BEGIN
    -- Retrieve a single reply
    SELECT replyID, userID, commentID, text
    FROM Replies
    WHERE replyID = @replyID;
END;
