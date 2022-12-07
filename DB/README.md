# DB Tables
## user
#### id INT AUTO_INCREMENT,
#### username VARCHAR(50) UNIQUE,
#### password TEXT NOT NULL,
#### email VARCHAR(100) UNIQUE,
#### phone VARCHAR(27) NOT NULL,
#### PRIMARY KEY (id));
## profile
#### id INT AUTO_INCREMENT,
#### username VARCHAR(50) UNIQUE,
#### birthday VARCHAR(20),
#### motto VARCHAR(200),
#### aboutme TEXT,
#### PRIMARY KEY (id));
## apost
#### id INT AUTO_INCREMENT,
#### username VARCHAR(50) NOT NULL,
#### postmessage TEXT NOT NULL,
#### datetime DATETIME,
#### PRIMARY KEY (id));
##