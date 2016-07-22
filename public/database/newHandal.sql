CREATE DATABASE newhandal;

USE newhandal;

CREATE TABLE member(

	member_Id VARCHAR(50) NOT NULL,
    
    member_Password VARCHAR(50) NOT NULL,
    
    member_Email VARCHAR(50) NULL,
    
    member_DisplayName VARCHAR (50) NOT NULL,
    
    PRIMARY KEY(member_Id)
    
    # member_Birth DATE NULL
)ENGINE=InnoDB;

CREATE TABLE bucket(

	member_Id VARCHAR(50) NOT NULL,
    FOREIGN KEY (member_Id) REFERENCES member(member_Id)
    ON UPDATE CASCADE
    ON DELETE CASCADE, 
    
    bucket_Id INT UNSIGNED NOT NULL,
    INDEX(bucket_Id),
    
    bucket_Goal VARCHAR(100) NOT NULL,
    
    bucket_Target_Date VARCHAR(50) NULL,
    
    bucket_Create_Date VARCHAR(50) NOT NULL,
    
    bucket_Archieved_Date VARCHAR(50) NULL,
        
    bucket_Description VARCHAR(1000) NULL,
    
    bucket_Image VARCHAR(200) NOT NULL,
    
    PRIMARY KEY(member_Id, bucket_Id),
    INDEX(bucket_Target_Date)
    
)ENGINE=InnoDB;

CREATE TABLE mandal(

	member_Id VARCHAR(50) NOT NULL,
    FOREIGN KEY (member_Id) REFERENCES member(member_Id)
    ON UPDATE CASCADE
    ON DELETE CASCADE, 
    
    mandal_Id INT UNSIGNED NOT NULL,
    INDEX(mandal_Id),
    
    mandal_content VARCHAR(100) NOT NULL,
    
    bucket_Id INT UNSIGNED NULL,
	FOREIGN KEY(bucket_Id) REFERENCES bucket(bucket_Id)
    ON UPDATE CASCADE
    ON DELETE SET NULL,
    
    mandal_Target_Date VARCHAR(50) NULL,
    
    mandal_Archieved_Date VARCHAR(50) NULL,
    
    PRIMARY KEY(member_Id, mandal_Id)

)ENGINE=InnoDB;

CREATE TABLE mandal_sub(

	member_Id VARCHAR(50) NOT NULL,
    FOREIGN KEY (member_Id) REFERENCES member(member_Id)
	ON UPDATE CASCADE
    ON DELETE CASCADE, 
    
    mandal_Id INT UNSIGNED NOT NULL,
    FOREIGN KEY(mandal_Id) REFERENCES mandal(mandal_Id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    
    mandal_sub_Id INT UNSIGNED NOT NULL,
    
    mandal_sub_Content VARCHAR(100) NULL,
    
    mandal_sub_Target_Date VARCHAR(50) NULL,
    
    mandal_sub_Archieved_Date VARCHAR(50) NULL,
    
    PRIMARY KEY(member_Id, mandal_Id, mandal_sub_Id),
    INDEX(mandal_sub_Id)
    
)ENGINE=InnoDB;

CREATE TABLE mandal_detail(

	member_Id VARCHAR(50) NOT NULL,
    FOREIGN KEY (member_Id) REFERENCES member(member_Id)
	ON UPDATE CASCADE
    ON DELETE CASCADE, 
    
    mandal_Id INT UNSIGNED NOT NULL,
    FOREIGN KEY(mandal_Id) REFERENCES mandal(mandal_Id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    
    mandal_sub_Id INT UNSIGNED NOT NULL,
    FOREIGN KEY(mandal_sub_Id) REFERENCES mandal_sub(mandal_sub_Id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
    
    mandal_detail_Content JSON NOT NULL,
    
    mandal_detail_Archieved_Date VARCHAR(50) NULL,
    
    PRIMARY KEY(member_Id, mandal_Id, mandal_sub_Id)
    
)ENGINE=InnoDB;

CREATE TABLE calendar(

	member_Id VARCHAR(50) NOT NULL,
    FOREIGN KEY (member_Id) REFERENCES member(member_Id)
	ON UPDATE CASCADE
    ON DELETE CASCADE, 
    
    calendar_Id INT UNSIGNED NOT NULL,
    
    calendar_Start VARCHAR(100) NOT NULL,
    
    calendar_End  VARCHAR(100) NULL,
    
    calendar_Title VARCHAR(100) NULL,
    
    calendar_AllDay BOOLEAN NOT NULL,
    
    PRIMARY KEY(member_Id, calendar_Id)
    
)ENGINE=InnoDB;
