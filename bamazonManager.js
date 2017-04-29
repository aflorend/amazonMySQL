// Dependencies
const mysql = require('mysql');
const config = require('./config.js');
const inquirer = require('inquirer');
require ('console.table');

connection = mysql.createConnection(config);

connection.connect(function(err) {
	if (err) throw err;
})

// Prompt for manager options and switch to run associated action
function displayOptions() {
	inquirer.prompt([
	{
		type: 'list',
		name: 'managerAction',
		message: 'Welcome Manager. What would you like to manage?',
		choices: ['View Products for Sale','View Low Inventory','Add to Inventory','Add New Product']
	}]).then(function(answer) {

		connection.query('SELECT * FROM products', function(err, res) {
			if (err) throw err;

			var managerAction = answer.managerAction;

			switch (managerAction) {
				case 'View Products for Sale':
					viewAll(res);
					break;

				case 'View Low Inventory':
					lowInventory(res);
					break;

				case 'Add to Inventory':
					addInventory(res);
					break;

				case 'Add New Product':
					addProduct(res);
					break;
			};
		});
	});
};

// Display all items in table
function viewAll() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		console.log('\n','==========================','\n','Displaying all Bamazon items:', '\n','==========================')
		console.table(res);

		displayOptions();
	})
};

// Low items with quantity less than five
function lowInventory() {
	connection.query('SELECT * FROM products WHERE stock_quantity < 5',
	function (err, res) {
		if (err) throw err;
		console.log('\n','==========================','\n','Displaying items with low inventory:', '\n','==========================');
		console.table(res);

		displayOptions();
	});
};

// Adding to stock
function addInventory(table) {

	// Prompts for quantity information
	inquirer.prompt([{
		type: 'input',
		name: 'managerItem',
		message: 'Select the Item ID to add inventory:',
		validate: function(value) {
			if (isNaN(value) === false && value <= table.length) {
				return true;
			}
			console.log('\n','Please select a valid Item ID.');
			return false;
		}
	},
	{
		type: 'input',
		name: 'addQuantity',
		message: 'How much would you like to add to the item stock?',
		validate: function(value) {
			if (isNaN(value) === false && value > 0) {
				return true;
			}
			console.log('\n','Please input a valid number.');
			return false;
		}

	// mySQL query to update the stock
	}]).then(function(answer) {
		connection.query('UPDATE products SET stock_quantity = stock_quantity + ? WHERE ?', [answer.addQuantity,
		{
			item_id: answer.managerItem
		}], function (err, res) {
			if (err) throw err;
			console.log('\n','==========================','\n','Thanks! You added to the stock.', '\n','==========================');

			viewAll();
		});
	})
};

// Adding a product
function addProduct() {

	// Prompts for input
	inquirer.prompt([
	{
		name: 'newItem',
		type: 'input',
		message: 'What new item would you like to add to the store?'
	},
	{
		name: 'newDepartment',
		type: 'input',
		message: 'What new item\'s department?'
	},
	{
		name: 'newPrice',
		type: 'input',
		message: 'What is the new item price?',
		validate: function (value) {
			if (isNaN(value) === false && value > 0) {
				return true;
			}
			console.log('Please input a valid number.')
			return false;
		}
	},
	{
		name: 'newQuantity',
		type: 'input',
		message: 'What initial stock would you like of the new item?',
		validate: function (value) {
			if (isNaN(value) === false && value > 0) {
				return true;
			}
			console.log('Please input a valid number.')
			return false;
		}
	}]).then(function(answer) {

		// mySQL query to insert new item
		connection.query('INSERT INTO products SET ?', {
			product_name: answer.newItem,
			department_name: answer.newDepartment,
			price: answer.newPrice,
			stock_quantity: answer.newQuantity
		}, function (err, res) {
			if (err) throw err;
			console.log('\n','==========================','\n','Thanks! You added a new item.', '\n','==========================');

			viewAll();
		});
	});
};

displayOptions();