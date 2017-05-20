-- Data base Schema
CREATE DATABASE beatormatch_db;
USE beatormatch_db;

CREATE TABLE products(
id INT AUTO_INCREMENT NOT NULL,
category VARCHAR (50),
upc INT(255) NOT NULL,
product_name VARCHAR(55) NOT NULL,
product_desc VARCHAR(255) NOT NULL,
image VARCHAR(255) NULL,
quantity INT (10) Null,
price DECIMAL(10,2),

devoured BOOLEAN NOT NULL DEFAULT 0,
createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY (id)
);