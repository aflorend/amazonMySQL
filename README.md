# amazonMySQL

### Overview

Bamazon is a storefont powered by Node and MySQL that allows users to display, purchase, update, and manage store items.

### Instructions

Bamazon can be used as either a customer or a manager. To purchase items as a customer, start the store by typing in the Terminal:

```
node bamazonCustomer
```

Otherwise, to start Bamazon as a manager, type into the Terminal:

```
node bamazonManager
```
---
###### Note:
Bamazon requires config.js to export your MySQL configuration object. Please create your own using the example below:

```JavaScript
module.exports = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'Bamazon'
};
```
---