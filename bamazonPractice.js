var inquirer = require('inquirer');
var mysql = require('mysql');

// Define the MySQL connection parameters
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	user: 'root',

	password: 'root',
	database: 'Bamazon_DB'
});


function whatToBuy() {
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: "So, what do you wanna buy? Tell me the ID.",
		},
		{
			type: 'input',
			name: 'quantity',
			message: "How many would you like to purchase? Don't worry, I won't judge.",
		}
	]).then(function(answer) {

		var item = answer.item_id;
		var quantity = answer.quantity;

		var queryDatabase = 'SELECT * FROM products WHERE ?';

		connection.query(queryDatabase, {item_id: item}, function(err, data) {
			if (err) throw err;

			if (data.length === 0) {
				console.log("ERROR: Yeah... we don't sell that here or the ID you entered isn't legit. Second time's the charm?");

			} else {
				var productData = data[0];

				if (quantity <= productData.stock_quantity) {

                    var updateQueryDatabase = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                    
					connection.query(updateQueryDatabase, function(err, data) {
						if (err) throw err;

                        console.log("                                                                                        ");
						console.log("I got you, fam; your order's been placed. Your total is $" + productData.price * quantity);
						console.log("                                                                                        ");

						connection.end();
					})
				} else {
                    console.log("                                                                                        ");
                    console.log("Ouch, sorry, friend. This item's pretty popular and we don't have enough in stock for the quantity you entered.");
                    console.log("Wanna get something else while you're here?");
					console.log("                                                                                        ");

					productList();
				}
			}
		})
	})
}

function productList() {
	queryDatabase = 'SELECT * FROM products';

	connection.query(queryDatabase, function(err, data) {
		if (err) throw err;

		console.log("                     ");

		var productInfo = '';
		for (var i = 0; i < data.length; i++) {
			productInfo = '';
			productInfo += "Item ID: " + data[i].item_id;
			productInfo += "\nProduct Name: " + data[i].product_name;
			productInfo += "\nDepartment: " + data[i].department_name;
			productInfo += "\nPrice: $" + data[i].price + '\n';

			console.log(productInfo);
		}

	  	console.log("                                                         ");

	  	whatToBuy();
	})
}

function welcomeToBamazon() {
	productList();
}

welcomeToBamazon();