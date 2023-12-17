-- USE TALKY_APP
CREATE TABLE Users(
    userID VARCHAR(255) PRIMARY KEY,
    fullName VARCHAR(200) NOT NULL,
    username VARCHAR(200) NOT NULL UNIQUE,
    email VARCHAR(250) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(100) DEFAULT 'user',
    resetToken VARCHAR(500) DEFAULT NULL,
    expiryTime DATETIME DEFAULT NULL,
    welcomed BIT Default 0,
    isDeleted BIT DEFAULT 0,
    isSend BIT DEFAULT 0,
    profileImage VARCHAR(1000) DEFAULT 'https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o='
)

select * from Users

UPDATE Users SET role='Admin' where email='isaackilimok1@gmail.com' 

-- ALTER TABLE Users ADD 
DROP TABLE Users


ALTER TABLE Users
ADD isDeleted BIT DEFAULT 0;
