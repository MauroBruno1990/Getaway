const UserModel = require("../models/User");

const UserController = {
  //ver todos los usuarios desde /admin
  allUsers(req, res, next) {
    UserModel.findAll(req.body)
      .then((users) => res.status(200).send(users))
      .catch(next);
  },
  //ver un usuario por id desde /admin
  findById(req, res, next) {
    const id = req.params.id;
    UserModel.findByPk(id)
      .then((user) => res.status(200).send(user))
      .catch(next);
  },
  //registrarse desde /users/register
  createUser(req, res, next) {
    UserModel.create(req.body)
      .then((user) => res.status(201).send(user))
      .catch(next);
  },
  //editar la data de un usuario desde /users/:id
  updateUser(req, res, next) {
    const id = req.params.id;
    UserModel.update(req.body, {
      where: {
        id: id,
      },
    })
      .then((user) => res.status(201).send(user))
      .catch(next);
  },
  //eliminar un usuario desde /admin
  deleteUser(req, res, next) {
    const id = req.params.id;
    UserModel.destroy({ where: { id } })
      .then(() => res.send("usuario eliminado exitosamente").status(200))
      .catch(next);
  },

  //editar otros usuarios para promoverlos a administradores
  //si busco por pk updeteo de a uno, si busco por findAll la variable id pasa a ser ids y me retorna un arreglo de ids

   checkAccess(req, res, next) {
    const id = req.params.id;
    const access = req.params.access;
    console.log(access);
    UserModel.findByPk(id)
    .then((users) => {
      return users.update(req.body, {access: "admin"})
    })
    .then("user updated to admin successfully").status(201)
    
   }
   
  }

/* 
checkAccess(req, res, next) {
    const id = req.params.id;
    const accessType = [];
    if (!accessType.includes(req.user.access)) {
      console.log("usuario con acceso user");
      UserModel.update(req.body.access, {
        where: {
          id,
        },
      });
    }
  }, */


module.exports = UserController;