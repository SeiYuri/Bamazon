DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(200) NULL,
  department_name VARCHAR(50) NULL,
  price DECIMAL(10, 2),
  stock_quantity INT,
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Galaxy School Outfit", "Clothing", 25.50, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Masaaki Endoh CD", "Music", 14.00, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Voltron: Legendary Defender Blu-Ray", "Entertainment", 22.50, 108);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chocolate Chip Muffie", "Food", 1.75, 6);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook", "Electronics", 1200, 8000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Multicolored Hairties", "Beauty", 0.75, 175);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pocketknife", "Outdoors", 12.35, 41);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Aimer Poster", "Music", 7.77, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Iced Cookies", "Food", 3.21, 11);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Mr. Hippo Storybook", "Books", 4.00, 0);

