# DB Tables
## User
#### id INT AUTO_INCREMENT,
#### username VARCHAR(50) UNIQUE,
#### password TEXT NOT NULL,
#### email VARCHAR(100) UNIQUE,
#### phone VARCHAR(27) NOT NULL,
#### PRIMARY KEY (id));
## Profile
#### id INT AUTO_INCREMENT,
#### username VARCHAR(50) UNIQUE,
#### birthday VARCHAR(20),
#### motto VARCHAR(200),
#### aboutme TEXT,
#### PRIMARY KEY (id));
## Post
#### Post Id
#### Auth ID (equal to User ID)
#### PostContent (Text or somthing)
#### dateTime
##