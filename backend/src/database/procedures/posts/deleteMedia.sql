CREATE OR ALTER PROCEDURE deletePostMedia
    @postID VARCHAR(255)
AS
BEGIN
    DELETE FROM postMedia
    WHERE postID = @postID;
END;