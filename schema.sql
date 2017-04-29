CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
	department_name VARCHAR(100) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
	('Adidas Yeezy Boost 350 V2', 'Shoes', 3000, 10),
	('Christian Lebouton Unicorn Heels', 'Shoes', 5000, 10),
	('Gold Darth Vader Mask', 'Toys and Games', 1400000, 1),
	('Atari ET the Extra Terrestrial-Landfill Edition', 'Toys and Games', 0.10, 1000000),
	('Bob Dylan-Freewheelin Bob Dylan, Original', 'Music', 35000, 5),
	('The Beatles-The White Album, First Press', 'Music', 40000, 3),
	('1962 Ferarri 250 GTO', 'Cars', 38100000, 39),
	('1985 Yugo', 'Cars', 1, 5000),
	('Urinal-Marcel Duchamp', 'Household', 50000000, 2),
	('Urinal-actual urinal', 'Household', 30, 2000);