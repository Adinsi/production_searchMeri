// Connexion à notre base de donnée
const mongoose = require("mongoose");
mongoose
  .connect(
    `${process.env.DB_PASS}`,

    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("connected to  mongo Db"))
  .catch((error) => {
    console.log("Failled to " + error);
  });
