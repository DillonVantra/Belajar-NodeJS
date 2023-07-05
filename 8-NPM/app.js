import validator from "validator";
import chalk from "chalk";
import chalkTemplate from "chalk-template";

// console.log(validator.isEmail("dillon@gmail.com"));
// console.log(validator.isNumeric("0882345678"));

const text = chalkTemplate`Lorem ipsum dolor {italic.bgBlack.blue sit amet}, consectetur adipiscing {underline.bgCyan.green elit}. Etiam porttitor.`;
console.log(text);
