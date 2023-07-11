const yargs = require("yargs");
const {
  simpanContact,
  cl,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts");

yargs.command({
  command: "add",
  describe: "Menambahkan contact baru",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Email",
      demandOption: false,
      type: "string",
    },
    noHP: {
      describe: "Nomor HP",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    simpanContact(argv.nama, argv.email, argv.noHP);
  },
});

// Menampilkan daftar nama & no hp kontak
yargs.command({
  command: "list",
  describe: "Menampilkan nama dan nomor HP dari kontak yang tersedia",
  handler() {
    listContact();
  },
});

// menampilkan detail dari kontak
yargs.command({
  command: "detail",
  describe: "Menampilkan detail dari kontak yang tersedia berdasarkan nama.",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    detailContact(argv.nama);
  },
});

// menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Menghapus kontak berdasarkan nama.",
  builder: {
    nama: {
      describe: "Nama lengkap",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    deleteContact(argv.nama);
  },
});

yargs.parse();
