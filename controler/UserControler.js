const userModels = require("../models/user");
const ObjetId = require("mongoose").Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  userModels
    .find((error, docs) => {
      if (!error) res.send(docs);
      else console.log("Error to get data" + error);
    })
    .select("-password");
};

// L'information d'un seul utilisateurs
module.exports.userInfo = async (req, res) => {
  if (!ObjetId.isValid(req.params.id)) {
    return res.status(400).send("Id Inconnue" + req.params.body);
  }

  userModels
    .findById(req.params.id, (err, docs) => {
      if (!err) res.send(docs);
      else console.log("Id unknow" + err);
    })
    .select("-password");
};

//  Modifier le bio  qui est vide par défaut
module.exports.UpdateUser = async (req, res) => {
  try {
    if (!ObjetId.isValid(req.params.id)) {
      return res.status(400).send("Id Inconnue" + req.params.id);
    }

    userModels
      .findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            quartier: req.body.quartier,
            activite: req.body.activite,
            email: req.body.email,
            tel: req.body.tel, 
          },
        },
        {
          new: true,
        },
        (error, docs) => {
          if (!error) res.status(201).json(docs);
          else res.status(500).json({ message: error });
        }
      )
      .select("-password");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//  Supprimer un utilisteur de la base de donnée
module.exports.deleteUser = async (req, res) => {
  if (!ObjetId.isValid(req.params.id)) {
    return res.status(400).send("Id Inconnue" + req.params.id);
  }

  try {
    userModels.findByIdAndRemove(req.params.id, (error, docs) => {
      if (!error) res.status(200).json({ message: "succeesfully delleted" });
      else console.log("Update Error " + error);
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

//  Suivre un utilisateur
module.exports.follow = (req, res) => {
  if (!ObjetId.isValid(req.params.id)) {
    return res.status(400).json("Id Inconnue" + req.params.id);
  }

  try {
    // followers add
    userModels.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { following: req.body.idTofollow },
      },
      { new: true, upsert: true },
      (error, docs) => {
        if (!error) res.status(201).json(docs);
        else return res.status(400).json(error);
      }
    );

    //add to following

    userModels.findByIdAndUpdate(
      req.body.idTofollow,
      {
        $addToSet: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (error, docs) => {
        if (error) return res.send(error);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// Désabonner
module.exports.unfollow = async (req, res) => {
  if (
    !ObjetId.isValid(req.params.id) ||
    !ObjetId.isValid(req.body.idToUnfollow)
  ) {
    return res.status(400).json("Id Inconnue" + req.params.body);
  }

  try {
    // followers add
    userModels.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { following: req.body.idToUnfollow },
      },
      { new: true, upsert: true },
      (error, docs) => {
        if (!error) res.status(201).json(docs);
        else return res.status(400).json(error);
      }
    );

    //add to following

    userModels.findByIdAndUpdate(
      req.body.idToUnfollow,
      {
        $addToSet: { followers: req.params.id },
      },
      { new: true, upsert: true },
      (error, docs) => {
        if (error) return res.status(400).json(error);
      }
    );
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
