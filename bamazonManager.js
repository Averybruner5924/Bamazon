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
    inquirer
  .prompt([
    {
    type: "list",
      message: "Menu",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory" , "Add New Product"],
      name: "menu"
    }

    ])
    .then(function(answer) {
       var managerRequest = answer.menu;
       if (managerRequest === "View Products for Sale") {
        connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        })
      };
      if (managerRequest === "View Low Inventory") {
        connection.query("SELECT * FROM products WHERE quantity < 10", function(err, res) {
          if (err) throw err;
          console.log(res);
          connection.end();
        });
      };
      if (managerRequest === "Add to Inventory") {
        addInventory();
       
      };
      if (managerRequest === "Add New Product") {
        addProduct();
      };
    });
  }

    
  function addInventory() {  
    inquirer
    .prompt([
      {
    name: "id",
    type: "input",
    message: "What is the id of the product?"
    },
    {
    name: "quantity",
    type: "input",
    message: "What is the new quantity?"
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
      connection.end();
    }
  );
});
}

function addProduct() {  
  inquirer
  .prompt([
    {
  name: "name",
  type: "input",
  message: "What is the new product?"
  },
  {
  name: "department",
  type: "input",
  message: "What is the department?"
  },
  {
  name: "price",
  type: "input",
  message: "What is the price?"
  },
  {
  name: "quantity",
  type: "input",
  message: "What is the quantity?"
  },
 ])
 
.then(function(answer) {
    var productName = answer.name;
    var productDepartment = answer.department;
    var productPrice = answer.price;
    var productQuantity = answer.quantity;


      var query = connection.query(
        "INSERT INTO products SET ?",
        [
          {
            product_name: productName,
            department_name: productDepartment,
            price: productPrice,
            quantity: productQuantity
          }
        ],
  function(err, res) {
    connection.end();
  }
);
});
}