CREATE OR ALTER PROCEDURE updateComment
    @commentID VARCHAR(255),
    @content VARCHAR(500),
    @updatedAt VARCHAR(300)
AS
BEGIN
    -- Check if the comment exists before updating
    IF EXISTS (SELECT 1 FROM Comments WHERE commentID = @commentID)
    BEGIN
        -- Update the comment
        UPDATE Comments
        SET content = @content,
            createdAt = @updatedAt
        WHERE commentID = @commentID;

        SELECT 'Comment updated successfully' AS Result;
    END
    ELSE
    BEGIN
        -- Comment doesn't exist
        SELECT 'Comment does not exist. Update not performed.' AS Result;
    END
END;
