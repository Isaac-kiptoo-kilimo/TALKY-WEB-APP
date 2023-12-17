CREATE OR ALTER PROCEDURE likeComment
    @likeID VARCHAR(255),
    @commentID VARCHAR(255),
    @userID VARCHAR(255)
AS
BEGIN
    -- Check if the comment and user exist before adding a like
    IF EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID) AND
       EXISTS (SELECT 1 FROM Users WHERE userID = @userID)
    BEGIN
        
        -- Insert the like for the comment
        INSERT INTO CommentLikes (likeID, commentID, userID)
        VALUES (@likeID, @commentID, @userID);

        -- Update likes count for the comment
        UPDATE Comments
        SET likesCount = likesCount + 1
        WHERE commentID = @commentID;

        SELECT 'Like added for the comment successfully' AS Result;
    END
    ELSE
    BEGIN
        -- Comment or user doesn't exist
        SELECT 'Comment or user does not exist. Like not added.' AS Result;
    END
END;

drop procedure likeComment