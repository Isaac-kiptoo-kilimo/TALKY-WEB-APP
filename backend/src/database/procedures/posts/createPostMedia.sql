CREATE OR ALTER PROCEDURE createPostMedia(
    @postMediaID VARCHAR(255),
    @postID VARCHAR(255),
    @mediaFile VARCHAR(500)
)
AS
BEGIN
    INSERT INTO postMedia (postMediaID,postID, mediaFile)
    VALUES (@postMediaID,@postID, @mediaFile)
END