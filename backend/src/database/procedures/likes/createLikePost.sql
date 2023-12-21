CREATE OR ALTER PROCEDURE likePost(
    @likesID VARCHAR(255),
    @userID VARCHAR(255),
    @postID VARCHAR(255)
)
AS
BEGIN
    -- Check if the user and post exist before adding a like
    IF EXISTS (SELECT 1 FROM Users WHERE userID = @userID) AND
       EXISTS (SELECT 1 FROM Posts WHERE postID = @postID)
    BEGIN
        -- Insert the like for the post
        INSERT INTO Likes (likesID, userID, postID)
        VALUES (@likesID, @userID, @postID);

        -- Increment the likes count in the postLikeCount table
        IF EXISTS (SELECT 1 FROM postLikeCount WHERE postID = @postID)
        BEGIN
            UPDATE postLikeCount
            SET likesCount = likesCount + 1
            WHERE postID = @postID;
        END
        ELSE
        BEGIN
            INSERT INTO postLikeCount (postLikeCountID, likesCount, postID)
            VALUES (NEWID(), 1, @postID);
        END

        SELECT 'Like added for the post successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User or post doesn't exist
        SELECT 'User or post does not exist. Like not added.' AS Result;
    END
END;