CREATE OR ALTER PROCEDURE addReplyToComment(
    @replyID VARCHAR(255),
    @userID VARCHAR(255),
    @commentID VARCHAR(255),
    @text VARCHAR(500)
    
)
AS
BEGIN
    -- Check if the user and comment exist before adding a reply
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID)
    BEGIN
        -- Insert the reply
        INSERT INTO Replies (replyID, userID, commentID, text)
        VALUES (@replyID, @userID, @commentID, @text);

        SELECT 'Reply added successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User or comment doesn't exist
        SELECT 'User or comment does not exist. Reply not added.' AS Result;
    END
END;
