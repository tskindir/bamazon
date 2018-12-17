var inquirer = require("inquirer");
var mysql = require("mysql");
var instockids = [];
//fetch all products and display them in the console
//use inquirer to prompt the user for id and amount for purchase
//check amount if not enough "Insufficient quantity!"
//update sql if sale goes through and prompt cost to user 

//create connection to bamazon database in mysql
var connection = mysql.createConnection({
  host: "localhost",
  port: 3307,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    afterConnection();
  });
  
function afterConnection() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    var productsList = displayProducts(res);
    inquirer.prompt([
        {
            type: "list",
            message: "Items available for sale.",
            choices: productsList,
            name: "purchaseItem"
        }
    ]).then(function(response){
        for (var i = 0; i > productsList.length; i++)
        if (response.purchaseItem === productsList[i]){
            var itemChoseID = instockids[i];
            inquirer.prompt([
                {
                    type: "input",
                    message: res[itemChoseID].stock_quantity + "left of " + res[itemChoseID].product_name + "./n",
                    name: "quantity"
                }
            ]).then(function(response2){
                var quantity = parseInt(response2.quantity)
                    if (quantity > 0 && quantity <= res[itemChoseID].stock_quantity){
                        completeSale(itemChoseID, quantity);
                    }
                    else(console.log("Insufficient quantity!"));
            });
        }
    });

    connection.end();
  });
}




function displayProducts(sqldata) {
    var products = [];
    for(var i = 0; i < sqldata.length; i++){
        if (sqldata[i].stock_quantity > 0){
            products[i] = "Item ID " + 
            sqldata[i].item_id + 
            ": " + 
            sqldata[i].product_name + " for $" +
            sqldata[i].price + 
            ", " +
            sqldata[i].stock_quantity +
            " left.";

            instockids[i] = sqldata[i].item_id;    
        }
        //instockids = instockids.filter(Boolean);
        //learned filter.(Boolean) method removes empty values in array
        //i googled it i understand it is a function that arrays can call that will return a new array
        //i do not understand why a boolean constructor is being passed 
        //but it removes empty values empty strings and broken array and returns a new array
        instockids = instockids.filter(Boolean);
        
    }
    return products.filter(Boolean);
}

//function that changes database values and return completed sale
function completeSale(id, amount) {
    console.log("Thank you for your buissness!");
}