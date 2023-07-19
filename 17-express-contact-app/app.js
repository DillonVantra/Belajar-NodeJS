const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
} = require("./utils/contacts");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const { query, body, check, validationResult } = require("express-validator");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const port = 3000;
const cl = (cl) => console.log(cl);

app.set("view engine", "ejs"); // gunakan ejs
app.use(expressLayouts); // Third-party middleware
app.use(express.static("public")); // Built-in middleware, untuk mengakses file static seperti gambar, video, dll
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  const mahasiswa = [
    { nama: "Dillon", email: "dillon@gmail.com" },
    { nama: "Geri", email: "geri@gmail.com" },
    { nama: "Macs", email: "macs@gmail.com" },
  ];
  res.render("index", {
    nama: "Dillon",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layout",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", {
    layout: "layouts/main-layout",
    title: "Halaman Contact",
    contacts,
    msg: req.flash("msg"),
  });
});

// halaman form untuk tambah data kontak
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

// proses data kontak
app.post(
  "/contact",
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama contact sudah digunakan!");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("nohp", "Nomor HP tidak valid!").isMobilePhone("id-ID"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Kontak",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // kirimkan flash message
      req.flash("msg", "Data kontak berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// halaman detail kontak
app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
