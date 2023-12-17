CREATE OR ALTER PROCEDURE getAllPostsAndMedia
AS
BEGIN
    SELECT
        P.postID,
        P.userID,
        P.caption,
        U.username,
        u.fullName,
        profileImage,
        PM.postMediaID,
        PM.mediaFile,
        P.createdAt
    FROM
        Posts P
    LEFT JOIN
        postMedia PM ON P.postID = PM.postID
    LEFT JOIN
        Users U ON P.userID = U.userID;
END;