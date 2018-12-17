DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45),
  price INT(10),
  stock_quantity INT(10),    
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("cake", "food", 100, 1),
("beef", "food", 5, 1000),
("pizza", "food", 20, 100),
("scarf", "clothes", 40, 15),
("turtle", "pets", 200, 10),
("soccerball", "sports", 50, 20),
("basketball", "sports", 50, 200),
("computer", "electronics", 2000, 2),
("drywall", "home improvement", 10, 1000),
("dog", "pets", 500, 5);

-- ### Alternative way to insert more than one row
-- INSERT INTO products (flavor, price, quantity)
-- VALUES ("vanilla", 2.50, 100), ("chocolate", 3.10, 120), ("strawberry", 3.25, 75);
