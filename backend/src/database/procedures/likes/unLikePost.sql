-- Create unlikePost Stored Procedure
CREATE OR ALTER PROCEDURE unlikePost
    @userID VARCHAR(255),
    @postID VARCHAR(255)
AS
BEGIN
    -- Check if the user has liked the post
    IF EXISTS (SELECT 1 FROM Likes WHERE userID = @userID AND postID = @postID)
    BEGIN
        -- Remove the like for the post
        DELETE FROM Likes
        WHERE userID = @userID AND postID = @postID;

        -- Decrement the likes count in the postLikeCount table
        UPDATE postLikeCount
        SET likesCount = CASE WHEN likesCount > 0 THEN likesCount - 1 ELSE 0 END
        WHERE postID = @postID;

        SELECT 'Unlike successful' AS Result;
    END
    ELSE
    BEGIN
        -- User has not liked the post
        SELECT 'User has not liked the post. Unlike not performed.' AS Result;
    END
END;

