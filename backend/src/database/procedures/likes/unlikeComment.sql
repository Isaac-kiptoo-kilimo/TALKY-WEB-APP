CREATE OR ALTER PROCEDURE unlikeComment
    @commentID VARCHAR(255),
    @userID VARCHAR(255)
AS
BEGIN
    -- Check if the comment and user exist before removing a like
    IF EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @userID)
    BEGIN
        -- Decrease likes count for the comment
        UPDATE Comments
        SET likesCount = CASE WHEN likesCount > 0 THEN likesCount - 1 ELSE 0 END
        WHERE commentID = @commentID;

        -- Remove the like for the comment
        DELETE FROM CommentLikes
        WHERE commentID = @commentID AND userID = @userID;

        SELECT 'Unlike successful' AS Result;
    END
    ELSE
    BEGIN
        -- Comment or user doesn't exist
        SELECT 'Comment or user does not exist. Unlike not performed.' AS Result;
    END
END;
