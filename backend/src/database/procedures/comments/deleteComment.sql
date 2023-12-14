CREATE OR ALTER PROCEDURE deleteComment
    @commentID VARCHAR(255)
AS
BEGIN
    -- Check if the comment exists before deleting
    IF EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID)
    BEGIN
        -- Delete the comment
        DELETE FROM Comments
        WHERE commentID = @commentID;

        SELECT 'Comment deleted successfully' AS Result;
    END
    ELSE
    BEGIN
        -- Comment doesn't exist
        SELECT 'Comment does not exist. Deletion not performed.' AS Result;
    END
END;
