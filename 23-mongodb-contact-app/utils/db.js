const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/testing")
  .then(() => console.log("Connected!"));

// // Menambah 1 document
// const contact1 = new Contact({
//   nama: "Dono",
//   nohp: "08123456777",
//   email: "dono@gmail.com",
// });

// // Simpan ke collection
// contact1.save().then((contact) => console.log(contact));
