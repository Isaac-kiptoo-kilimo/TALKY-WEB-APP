CREATE OR ALTER PROCEDURE registerUser(
    @userID VARCHAR(255),
    @fullName VARCHAR(200),
    @username VARCHAR(200),
    @email VARCHAR(250),
    @password VARCHAR(100)
)

AS
BEGIN
     INSERT INTO Users(userID,fullName,username,email,password)
     VALUES(@userID,@fullName,@username,@email,@password)
END

DROP PROCEDURE registerUser

GO

CREATE OR ALTER PROCEDURE registerUser
    @userID VARCHAR(255),
    @fullName VARCHAR(200),
    @username VARCHAR(200),
    @email VARCHAR(250),
    @password VARCHAR(100)
AS
BEGIN
    BEGIN TRY
        INSERT INTO Users (userID, fullName, username, email, password)
        VALUES (@userID, @fullName, @username, @email, @password);

        SELECT 'User registered successfully' AS Result;
    END TRY
    BEGIN CATCH
        -- Check for unique constraint violation
        IF ERROR_NUMBER() = 2627
        BEGIN
            SELECT 'Username or email already exists. User not registered.' AS Result;
        END
        ELSE
        BEGIN
            SELECT 'Check your details'
            THROW;
        END
    END CATCH
END;
