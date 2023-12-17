CREATE OR ALTER PROCEDURE getAllPostComments
(
    @postID VARCHAR(255)
)
AS
SET NOCOUNT ON;
BEGIN
    SELECT
        C.commentID,
        C.postID,
        C.userID,
        C.content,
        C.likesCount,
        P.caption,
        U.username,
        U.fullName,
        U.profileImage,
        PM.mediaFile,
        C.createdAt
    FROM
        Comments C
    LEFT JOIN
        Posts P ON C.postID = P.postID
    LEFT JOIN
        postMedia PM ON C.postID = PM.postID
    LEFT JOIN
        Users U ON C.userID = U.userID
    WHERE
        C.postID = @postID;
END;
