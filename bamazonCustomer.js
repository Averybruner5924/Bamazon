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
      // Log all results of the SELECT statement
      console.log(res);
      Purchase();
    });
  }

  function Purchase() {
    // prompt for info about the item being put up for auction
    inquirer
      .prompt([
        {
          name: "item",
          type: "input",
          message: "What is the item you would like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How much would you like to purchase?"
        },
      ])
      .then(function(answer) {
      var query = connection.query(
        "UPDATE products SET ? WHERE ?",
        [
          {
          product_name: answer.item,
          },
          {
            quantity: answer.quantity,
          }
        ],
        function(err, res) {
          console.log(res.affectedRows + " products updated!\n");
          connection.end();
        }
    )
});
};
