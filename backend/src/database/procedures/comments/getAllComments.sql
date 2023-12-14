CREATE OR ALTER PROCEDURE getAllComments
AS
BEGIN
    -- Retrieve all comments
    SELECT commentID, userID, postID, content, createdAt
    FROM Comments;
END;
