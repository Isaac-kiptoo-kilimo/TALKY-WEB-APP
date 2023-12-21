CREATE OR ALTER PROCEDURE deleteUser
    @userID VARCHAR(255)
AS
BEGIN
    DECLARE @isDeleted BIT;

    -- Check if the user exists
    SELECT @isDeleted = isDeleted
    FROM Users
    WHERE userID = @userID;

    IF @isDeleted IS NULL
    BEGIN
        -- User not found
        SELECT 'User not found' AS Result;
    END
    ELSE IF @isDeleted = 0
    BEGIN
        -- Soft delete the user
        UPDATE Users
        SET isDeleted = 1
        WHERE userID = @userID;

        SELECT 'User deleted successfully' AS Result;
    END
    ELSE
    BEGIN
        -- User is already soft-deleted
        SELECT 'User already deleted' AS Result;
    END
END;



DROP PROCEDURE deleteUser