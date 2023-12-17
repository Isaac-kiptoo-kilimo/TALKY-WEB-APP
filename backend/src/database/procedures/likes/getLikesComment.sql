CREATE OR ALTER PROCEDURE getLikesForComment
    @commentID VARCHAR(255)
AS
BEGIN
    -- Retrieve likes for a specific comment
    SELECT likesID, userID, commentID, createdAt
    FROM Likes
    WHERE commentID = @commentID;
END;
