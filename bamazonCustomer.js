var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazonDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
    console.log("Products available for purchase: ");
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log(res);
      Purchase();
    });
  };

  function Purchase() {
    inquirer
      .prompt([
        {
          name: "id",
          type: "input",
          message: "What is the id of the product you wish to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How much would you like to purchase?"
        },
      ])
      .then(function(answer) {
        var customerQuantity = answer.quantity;
        var customerId = answer.id;

          var query = connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                quantity: customerQuantity
              },
              {
                item_id: customerId
              }
            ],
            function(err, res) {
              if (err) throw err;
              console.log (customerQuantity);
              console.log("Purchase Sucessful");
              connection.end();
            }
          );
        }
      )}
          
