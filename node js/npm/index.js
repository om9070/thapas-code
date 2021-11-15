const chalk = require("chalk");
console.log(chalk.green.underline.inverse("hello one"));

const result = require("validator");
const mail = (result.isEmail("om9070@gmail.com"));
console.log(mail ? chalk.green.inverse(mail) : chalk.red.inverse(mail));