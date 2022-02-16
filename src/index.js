const express = require("express");
const morgan = require("morgan");
const path = require("path");
const app = express();
const { database } = require("./key");
const session = require("express-session");
const MySQLStore = require("express-mysql-session");


//import routes
const customerRoutes = require("./routes/customer.js");
const { urlencoded } = require("express");


//settings //Configurando el servidor
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


//middlewares // los middlewares son funciones
app.use(morgan("dev"));
app.use(
  session({
    secret: "pr4zka",
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  })
);
//para poder recibir los datos del formulario
app.use(express.urlencoded({extended: false}));


//routes //las routas son las peticiones del servidor lo cual debe renderizar algo
app.use("/", customerRoutes);

//static files
app.use(express.static(path.join(__dirname, "public")));

//configuracion del puerto
app.listen(app.get("port"), () => {
  console.log("Server on port 3000");
});
