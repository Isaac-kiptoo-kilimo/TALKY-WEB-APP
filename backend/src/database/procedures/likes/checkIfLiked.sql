CREATE OR ALTER PROCEDURE checkIfLiked
    @userID VARCHAR(255),
    @postID VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

    -- Check if the user has liked the post
    IF EXISTS (SELECT 1 FROM Likes WHERE userID = @userID AND postID = @postID)
    BEGIN
        SELECT 1 AS hasLiked; -- User has liked the post
    END
    ELSE
    BEGIN
        SELECT 0 AS hasLiked; -- User has not liked the post
    END
END;
