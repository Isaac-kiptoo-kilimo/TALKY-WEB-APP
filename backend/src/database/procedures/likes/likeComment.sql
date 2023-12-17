CREATE OR ALTER PROCEDURE likeComment
    @likesID VARCHAR(255),
    @userID VARCHAR(255),
    @commentID VARCHAR(255)
AS
BEGIN
    -- Check if the user and comment exist before adding a like
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID)
    BEGIN
        -- Insert the like for the comment
        INSERT INTO Likes (likesID, userID, commentID)
        VALUES (@likesID, @userID, @commentID);

        SELECT 'Like added for the comment successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User or comment doesn't exist
        SELECT 'User or comment does not exist. Like not added.' AS Result;
    END
END;
