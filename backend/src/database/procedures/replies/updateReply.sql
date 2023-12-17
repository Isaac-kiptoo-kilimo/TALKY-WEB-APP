CREATE OR ALTER PROCEDURE updateReply(
    @replyID VARCHAR(255),
    @text VARCHAR(500)
)
AS
BEGIN
    -- Check if the reply exists before updating
    IF EXISTS (SELECT 1 FROM Replies WHERE replyID = @replyID)
    BEGIN
        -- Update the reply
        UPDATE Replies
        SET text = @text
        WHERE replyID = @replyID;

        SELECT 'Reply updated successfully' AS Result;
    END
    ELSE
    BEGIN
        -- Reply doesn't exist
        SELECT 'Reply does not exist. Update not performed.' AS Result;
    END
END;
