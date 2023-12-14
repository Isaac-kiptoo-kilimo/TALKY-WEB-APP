CREATE OR ALTER PROCEDURE addComment
    @commentID VARCHAR(255),
    @userID VARCHAR(255),
    @postID VARCHAR(255),
    @content VARCHAR(500),
    @createdAt VARCHAR(300)
AS
BEGIN
    -- Check if the user and post exist before adding a comment
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Posts WHERE postID = @postID)
    BEGIN
        -- Insert the comment
        INSERT INTO Comments (commentID, userID, postID, content, createdAt)
        VALUES (@commentID, @userID, @postID, @content, @createdAt);

        SELECT 'Comment added successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User or post doesn't exist
        SELECT 'User or post does not exist. Comment not added.' AS Result;
    END
END;
