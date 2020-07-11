"use strict";

var Admin = require("../models/model.admin");
var Animal = require("../models/model.animal");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

function login(req, res) {
  let params = req.body;

  if (params.email && params.password) {
    Admin.findOne(
      { email: params.email, password: params.password },
      (err, login) => {
        if (err) {
          res.status(500).send({ message: err });
        } else if (login) {
          res.send({ message: login });
        } else {
          res.status(404).send({ message: "Este usuario no existe" });
        }
      }
    );
  } else {
    res.status(404).send({ message: "Ingresar correo o contraseña" });
  }
}

function saveManager(req, res) {
  let params = req.body;
  let admin = new Admin();
  if (
    params.name &&
    params.position &&
    params.phone &&
    params.sex &&
    params.email &&
    params.password
  ) {
    Admin.findOne(
      {
        position: params.position,
        email: params.email,
        sex: params.sex,
        phone: params.phone,
      },
      (err, adminFound) => {
        if (err) {
          res.status(500).send({ message: "Error en el servidor" });
        } else if (adminFound) {
          res.send({ message: "Este usuario ya fue creado: ", adminFound });
        } else {
          admin.name = params.name;
          admin.position = params.position;
          admin.phone = params.phone;
          admin.sex = params.sex;
          admin.email = params.email;
          admin.password = params.password;
          admin.save((err, adminSave) => {
            if (err) {
              res.status(500).send({ message: "Error en el servidor" });
            } else if (adminSave) {
              res.send({
                message: "El siguiente usuario fue agregado: ",
                adminSave,
              });
            } else {
              res.status(500).send({ message: "El usuario  no fue guardado" });
            }
          });
        }
      }
    );
  }
}

function getManagers(req, res) {
  Admin.find({}, (err, managersFound) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else if (managersFound) {
      res.send({ managers: managersFound });
    } else {
      res.status(404).send({ message: "No hay registros" });
    }
  });
}

function searchManager(req, res) {
  let params = req.body;
  if (params.name) {
    Admin.find({ name: params.name }, (err, managerFound) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (managerFound) {
        res.send({ manager: managerFound });
      } else {
        res.status(404).send({ message: "Ese usuario no existe" });
      }
    });
  } else if (params.position) {
    Admin.find({ position: params.position }, (err, managerFound) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (managerFound) {
        res.send({ manager: managerFound });
      } else {
        res.status(404).send({ message: "Ese usuario no existe" });
      }
    });
  } else if (params.phone) {
    Admin.find({ phone: params.phone }, (err, managerFound) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (managerFound) {
        res.send({ manager: managerFound });
      } else {
        res.status(404).send({ message: "Ese usuario no existe" });
      }
    });
  }
}

//Animals

function setAnimal(req, res) {
  let managerId = req.params.id;
  let paramsAnimal = req.body;
  let animal = new Animal();

  Admin.findById(managerId, (err, managerFound) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else if (managerFound) {
      if (
        paramsAnimal.name &&
        paramsAnimal.kind &&
        paramsAnimal.advanceName &&
        paramsAnimal.age
      ) {
        animal.name = paramsAnimal.name;
        animal.kind = paramsAnimal.kind;
        animal.age = paramsAnimal.age;
        animal.advanceName = paramsAnimal.advanceName;
        Admin.findOne(
          {
            "animals.name": paramsAnimal.name,
            "animals.kind": paramsAnimal.kind,
            "animals.age": paramsAnimal.age,
          },
          (err, animalFound) => {
            if (err) {
              res.status(500).send({ message: "Error en el servidor" });
            } else if (animalFound) {
              res.send({ message: "Este animal ya fue registrado" });
            } else {
              Admin.findByIdAndUpdate(
                managerId,
                { $push: { animals: animal } },
                { new: true },
                (err, managerUpdated) => {
                  if (err) {
                    res.status(500).send({ message: err });
                  } else if (managerUpdated) {
                    res
                      .status(200)
                      .send({
                        message: "El siguiente contacto ha sido agregado",
                        managerUpdated,
                      });
                  } else {
                    res
                      .status(404)
                      .send({ message: "El animal no se ha agregado" });
                  }
                }
              );
            }
          }
        );
      } else {
        res.status(404).send({ message: "Ingrese los datos necesarios" });
      }
    } else {
      res.status(404).send({ message: "Este usuario no existe" });
    }
  });
}

function searchAnimal(req, res) {
  let search = req.body;
  if (search.name) {
    Admin.find({ "animals.name": search.name }, (err, animal) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (animal) {
        res.send({ animal });
      } else {
        res.status(404).send({ message: "El animal no existe" });
      }
    });
  } else if (search.kind) {
    Admin.find({ "animals.kind": search.kind }, (err, animal) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (animal) {
        res.send({ animal });
      } else {
        res.status(404).send({ message: "El animal no existe" });
      }
    });
  } else if (search.advanceName) {
    Admin.find({ "animals.advanceName": search.advanceName }, (err, animal) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else if (animal) {
        res.send({ animal });
      } else {
        res.status(404).send({ message: "El animal no existe" });
      }
    });
  }
}

module.exports = {
  saveManager,
  getManagers,
  searchManager,
  setAnimal,
  login,
  searchAnimal,
};
