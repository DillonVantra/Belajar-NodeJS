// fs = file system
const fs = require("fs");
const cl = (cl) => console.log(cl);
// menuliskan string ke file secara synchronous
// try {
//   fs.writeFileSync("data/test.txt", "Hi World secara synch!");
// } catch (e) {
//   console.log(e);
// }

// menuliskan string ke file secara asynchronous
// fs.writeFile("data/test.txt", "Hello World secara asynch", (err) => {
//   console.log(err);
// });

// membaca isi file secara synchronous
// const readData = fs.readFileSync("data/test.txt", "utf-8");
// console.log(readData);

// membaca isi file secara asynchronous
// const readDataAsync = fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan nama anda: ", (nama) => {
  rl.question("Masukkan no. HP anda : ", (noHP) => {
    const contact = { nama, noHP };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    cl("Terima kasih");

    rl.close();
  });
});
