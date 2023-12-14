-- CREATE OR ALTER PROCEDURE updatePost(
--     @postID VARCHAR(255),
--     @userID VARCHAR(255),
--     @caption VARCHAR(400),
--     @createdAt VARCHAR(300)
-- )
-- AS
-- BEGIN
--     UPDATE Posts
--     SET
--         userID = @userID,
--         caption = @caption,
--         createdAt = @createdAt
--     WHERE
--         postID = @postID;
-- END;

-- DROP PROCEDURE updatePost

CREATE TYPE dbo.ImageListType AS TABLE
(
    mediaFile VARCHAR(500)
);

Go
CREATE OR ALTER PROCEDURE updatePostAndImages(
    @postID VARCHAR(255),
    @userID VARCHAR(255),
    @caption VARCHAR(400),
    @createdAt VARCHAR(300),
    @updatedImages dbo.ImageListType READONLY 
)
AS
BEGIN
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Update the post
        UPDATE Posts
        SET
            userID = @userID,
            caption = @caption,
            createdAt = @createdAt
        WHERE
            postID = @postID;

        -- Delete existing images associated with the post
        DELETE FROM postMedia
        WHERE
            postID = @postID;

        -- Insert the updated images
        INSERT INTO postMedia (postMediaID, postID, mediaFile)
        SELECT
            NEWID(), -- or any method to generate a unique ID
            @postID,
            mediaFile
        FROM
            @updatedImages;

        COMMIT;
    END TRY
    BEGIN CATCH
        -- An error occurred, rollback the transaction
        ROLLBACK;
        THROW;
    END CATCH;
END;
