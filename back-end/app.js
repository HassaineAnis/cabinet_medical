const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");

const medecinRoutes = require("./routes/medecin");
const userRoutes = require("./routes/user");
const consultRoutes = require("./routes/consultation");
const personnelRoutes = require("./routes/personnel");
const rendezVousRoutes = require("./routes/rendezVous");
const patientRoutes = require("./routes/patient");
const congeRoutes = require("./routes/conge");
const magasinRoutes = require("./routes/magasin");
const interventionRoutes = require("./routes/intervention");
const analyse = require("./routes/analyseM");
const navetteRoutes = require("./routes/navette");
const produitRoutes = require("./routes/produit");
const qntProduitRoutes = require("./routes/qntProduit");
const surveillanceRoutes = require("./routes/surveillance");
const surveillanceBebeRoutes = require("./routes/surveillanceBebe");
const naissanceRoutes = require("./routes/acteNaissance");
const conventionRoutes = require("./routes/convention");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  },
});

const path = require("path");

mongoose
  .connect("mongodb://localhost:27017/cabinetMedical", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api/medecin", medecinRoutes);
app.use("/photo", express.static(path.join(__dirname, "photo")));
app.use("/document", express.static(path.join(__dirname, "document")));

app.use("/api/users", userRoutes);
app.use("/api/consultation", consultRoutes);
app.use("/api/personnel", personnelRoutes);
app.use("/api/rendez-vous", rendezVousRoutes);
app.use("/api/patient", patientRoutes);

app.use("/api/conge", congeRoutes);
app.use("/api/magasin", magasinRoutes);
app.use("/api/intervention", interventionRoutes);
app.use("/api/analyse", analyse);
app.use("/api/navette", navetteRoutes);
app.use("/api/produit", produitRoutes);
app.use("/api/quantite", qntProduitRoutes);
app.use("/api/surveillance", surveillanceRoutes);
app.use("/api/bebe/surveillance", surveillanceBebeRoutes);
app.use("/api/naissance", naissanceRoutes);
app.use("/api/convention", conventionRoutes);

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("message_ajout", (data) => {
    console.log(data);
    io.emit("afterAddData", data);
  });

  socket.on("supprimerData", (data) => {
    console.log(data);
    io.emit("afterDeleteData", data);
  });
  socket.on("supprimerRdvPatient", (data) => {
    console.log(data);
    io.emit("afterDeleteRdvPatient", data);
  });

  socket.on("confirmerdv", (data) => {
    console.log(data);
    io.emit("afterConfirmerdv", data);
  });
  socket.on("payeConsult", (data) => {
    console.log(data);
    io.emit("afterPayeConsult", data);
  });
  socket.on("addConsult", (data) => {
    console.log(data);
    io.emit("afterAddConsult", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnect");
  });
});

module.exports = { app, server, io };
