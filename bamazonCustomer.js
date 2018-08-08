var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
   productsList();
   whatToBuy();
  /*afterConnection();*/
});

/*function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(res);
    connection.end();
  });
}*/

function productsList() {
    connection.query("SELECT * FROM products", function (err, res) {
        for (var i = 0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\nProduct: " + res[i].product_name + "\nDepartment: " + res[i].department_name + "\nPrice: $" + res[i].price);
            console.log("                        "); 
        }
    });
}

function whatToBuy() {
    inquirer.prompt([
    {
        name: "item",
        type: "list",
        message: "So, what do you wanna buy? Tell me the ID.",
        choices: [
            "ID 1: Galaxy Uniform",
            "ID 2: Masaaki Endoh CD",
            "ID 3: Voltron Blu-Ray",
            "ID 4: Chocolate Chip Muffie",
            "ID 5: Macbook",
            "ID 6: Multicolored Hairties",
            "ID 7: Pocketknife",
            "ID 8: Aimer Poster",
            "ID 9: Iced Cookies",
            "ID 10: Mr. Hippo's Storybook",   
        ]        
    },
    {
        name: 'quantity',
        type: 'input',
        message: 'How many would you like to purchase?'
    }                    
])
}

/*checkInventory();

var checkInventory = function(){
    connection.query('SELECT * FROM Products WHERE item_ID =' + item, function(err, result) {
        if (err) throw err;
        //console.log(result);

        var productInventory = answer[0].stock_quantity;
        var productsPrice = result[0].price;
        var isInStock = productInventory - quantity;
        var totalCost= productsPrice * item;

        if (item > productInventory || productInventory === 0){
            console.log("Apologies but there isn't enough in stock to complete your order. Please try again."+"\r\n"+"\r\n");
        } else {
            console.log("Thanks for your purchase!");
        }
    })
}
}


            /*console.log("You are purchasing "+ userWantsToBuy +" "+result[0].ProductName+"s at $"+ result[0].Price+" per item.");
            console.log("Your total is $"+totalCost);
            connection.query('UPDATE Products SET StockQuantity = '+isInStock+' WHERE ItemID ='+userChoiceID, function(err, result){
            if (err) throw err;
                connection.query('SELECT ItemID, ProductName, DepartmentName, Price, StockQuantity FROM products WHERE ItemID ='+userChoiceID, function(err, result){
                    //console.log(result);
                }); 
            });
            prom*/




    
    /*.then(function(answers) {
			console.log(answers);
			var item_id = answers.item;
			console.log(item_id);
			var item = res[item_id - 1];
			console.log(item);
        var quantityCheck = item.stock_quantity - answers.quantity;
			if (quantityCheck >= 0) {
                connection.query('UPDATE products SET ? WHERE item_id = ?', [{ stock_quantity: quantityCheck }, item_id]);
                console.log("Order received! Enjoy your purchase.");
				whatToBuy();
			} else {
				console.log("You can't purchase that many! We don't have enough of that item.");
				whatToBuy();
			}                                                                      
        })*/