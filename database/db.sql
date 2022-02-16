--creating database
CREATE DATABASE crudnodejsmysql;

--using database
use crudnodejsmysql;

--creating a table
CREATE TABLE customer (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    adress VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

--show all tables
SHOW TABLES;

--to describe the tables
describe customer;
