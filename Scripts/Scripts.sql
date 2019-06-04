CREATE TABLE `UserDetails` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `first_name` varchar(500) NOT NULL,
 `last_name` varchar(500)  NOT NULL,
 `middle_name` varchar(100),
 `email` varchar(500) NOT NULL,
 `password` varchar(1000) NOT NULL,
 `isAdmin` boolean default false,
 `created` datetime NOT NULL,
 `modified` datetime NOT NULL,
 `salt` varchar(1000) NOT NULL,
 `Address` varchar(255) DEFAULT NULL,
 `City` varchar(255) DEFAULT NULL,
 `State` varchar(255) DEFAULT NULL,
 `Zip` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`)
);

CREATE TABLE `ProductDetails` (
 `product_id` int(11) AUTO_INCREMENT,
 `product_name` varchar(2000),
 `product_desc` varchar(3000),
 `price` int(11),
 `quantity` int(11),
 `gender` varchar(10),
 `category_id` int(11),
  PRIMARY KEY (`product_id`),
  FOREIGN KEY (`category_id`) REFERENCES Categories(`category_id`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE `Categories` (
 `category_id` int(11) AUTO_INCREMENT,
 `parent_category` varchar(500),
 `sub_category` varchar(500),
  PRIMARY KEY (`category_id`)
);

DELIMITER //
CREATE PROCEDURE SearchEcommerce (IN SearchName VARCHAR(255))
BEGIN
DECLARE SearchString varchar(255);

SET SearchString = SearchName;

SELECT distinct p.product_id,p.product_name,p.price,p.category_id
FROM ProductDetails p, Categories c
WHERE p.category_id = c.category_id
AND (p.product_name LIKE CONCAT ('%', SearchString, '%') OR p.product_desc LIKE CONCAT ('%', SearchString, '%') OR c.parent_category LIKE CONCAT ('%', SearchString, '%') OR c.sub_category LIKE CONCAT ('%', SearchString, '%'));
END //
DELIMITER;
