CREATE OR ALTER PROCEDURE getAllPostsAndMedia
AS
BEGIN
    SELECT
        P.postID,
        P.userID,
        P.caption,
        PM.postMediaID,
        PM.mediaFile
    FROM
        Posts P
    LEFT JOIN
        postMedia PM ON P.postID = PM.postID;
END;
