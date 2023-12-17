CREATE OR ALTER PROCEDURE getLikesForPost
    @postID VARCHAR(255)
AS
BEGIN
    -- Retrieve likes for a specific post
    SELECT likesID, userID, postID, createdAt
    FROM Likes
    WHERE postID = @postID;
END;