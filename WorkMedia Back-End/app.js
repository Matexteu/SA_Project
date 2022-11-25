require("dotenv").config();
const express = require("express");
const routes = require("./src/routes/index.routes.js");
const db = require("./src/config/db.js");
const cors = require("cors")
const PORT =  process.env.PORT || 4000;
const app = express();
app.use(express.json());
app.use(cors());
routes(app);

app.listen(PORT, ()=>{
    console.log(`Server rodando na porta ${PORT}`);
});

db.on('error', console.error.bind("Houve um erro na conexão com o banco de dados"));

db.once("open", ()=>{
    console.log("Conexão com o banco de dados feita com sucesso!")
})




