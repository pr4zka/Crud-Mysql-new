const { CLIENT_IGNORE_SPACE } = require("mysql/lib/protocol/constants/client");
const pool = require("../database");
const controller = {};

controller.list = async (req, res) => {
  const customers = await pool.query("SELECT * FROM customer"); //toma el id inico del usuario y le devuelve los enlaces
  res.render("customers", { data: customers });
};

controller.save = (req, res) => {
  const data = ({ name, adress, phone } = req.body);
  const customer = {
    name,
    adress,
    phone,
    //ALMACENA ESOS DATOS EN LA VARIABLE CUSTOMER
  };
  pool.query(
    "INSERT INTO customer set ?",
    [customer],
    (error, results, fields) => {
      // <- usamos una función callback
      if (error) {
        // <- Si ocurre un error en la consulta
        console.log(error); // <- mostramos error por consola
        return res.status(500).send("error"); // <- enviamos mensaje al cliente
      }

      console.log(customer);
      res.redirect("/"); // redirecionamos a la pagina con los datos ya cargados
    }
  );
};

controller.delete = async (req, res) => {
  //traigo el id del reques paramas para eliminar la tabla de acuerdo al id
  const { id } = req.params;
  //hago la consulta para eliminar de la base de datos
  await pool.query("DELETE FROM customer WHERE ID=? ", [id]);
  //redireciono al inicio de la pagina
  res.redirect("/");
};
controller.edit = async (req, res) => {
  const { id } = req.params;
  const customer = await pool.query("SELECT * FROM customer WHERE ID=?", [id]);
  res.render("customers_edit", { data: customer[0] });
};

controller.update = async (req, res) => {
  const { id } = req.params;
  const { name, adress, phone } = req.body;
  const newCustomer = {
    name,
    adress,
    phone,
  };
  await pool.query("UPDATE customer set ? WHERE id=?", [newCustomer, id]);
    res.redirect("/");
};
module.exports = controller;
