CREATE OR ALTER PROCEDURE getAllPostsAndMedia
AS
BEGIN
    SELECT
        P.postID,
        P.userID,
        P.caption,
        U.username,
        U.fullName,
        U.profileImage,
        PM.postMediaID,
        PM.mediaFile,
        P.createdAt,
        COUNT(L.likesID) AS likesCount,
        PLC.likesCount AS postLikesCount, 
        C.commentID,
        C.content AS commentText,
        C.createdAt AS commentCreatedAt,
        COUNT(R.replyID) AS replyCount
    FROM
        Posts P
    LEFT JOIN
        postMedia PM ON P.postID = PM.postID
    LEFT JOIN
        Users U ON P.userID = U.userID
    LEFT JOIN
        Likes L ON P.postID = L.postID
    LEFT JOIN
        Comments C ON P.postID = C.postID
    LEFT JOIN
        Replies R ON C.commentID = R.commentID
    LEFT JOIN
        postLikeCount PLC ON P.postID = PLC.postID 
    GROUP BY
        P.postID,
        P.userID,
        P.caption,
        U.username,
        U.fullName,
        U.profileImage,
        PM.postMediaID,
        PM.mediaFile,
        P.createdAt,
        C.commentID,
        C.content,
        C.createdAt,
        PLC.likesCount; 
END;
