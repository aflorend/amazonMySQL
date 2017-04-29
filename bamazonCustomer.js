// Dependencies
const mysql = require('mysql');
const config = require('./config.js');
const inquirer = require('inquirer');
require ('console.table');

connection = mysql.createConnection(config);

connection.connect(function(err) {
	if (err) throw err;
})

// User prompts to select item and quantity
function displayOptions(tableRows) {
	inquirer.prompt([
	{
		type: 'input',
		name: 'buyID',
		message: 'What is the product ID of the item you would like to buy?',
		validate: function(value) {
			if (isNaN(value) === false && value > 0 && value <= tableRows) {
				return true;
			}
			console.log('\n' + 'Please input a valid Item ID.');
			return false;
		}
	},
	{
		type: 'input',
		name: 'buyQuantity',
		message: 'How many would you like to buy?',
		validate: function(value) {
			if (isNaN(value) === false && value > 0) {
				return true;
			}
			console.log('\n' + 'Please input a number larger than zero.');
			return false;
		}

	// mySQL query to update stock after purchase
	}]).then(function(user) {
		var userItem = user.buyID;
		var userQuantity = user.buyQuantity;

		connection.query('SELECT * FROM products WHERE item_id =' + userItem, function(err, res) {
			if (err) throw err;

			// Must have enough in stock to complete purchase
			if (userQuantity > res[0].stock_quantity) {
				console.log('Sorry! You are ordering more than our current stock! Please select a valid quantity.');

				displayTable();
			}

			// Must not have negative or zero purchase
			else if (res[0].stock_quantity < 1) {
				console.log('Sorry! We\'re all out!');
				displayOptions();
			}
			else {
				updateQuantity(userItem, userQuantity);
			}
		});
	})
};

// Function to update the user-specified item quantity
function updateQuantity(item, quantity) {
	connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE ?', 
	[ quantity,
	{
		item_id: item
	}], function(err, res) {
		if (err) throw err;
	});
	console.log('Thanks for shopping! You purchased ' + quantity + ' itmes. Here is our updated stock.')
	
	displayTable();
};

// Display entire table
function displayTable() {
	connection.query('SELECT * FROM products', function(err, res) {
		if (err) throw err;
		console.table(res);

		var totalItems = res.length;

		displayOptions(totalItems);
	});
};

displayTable();