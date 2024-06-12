// Paso 3. Crear DB en memoria / Array
const users = [];

export const getUsers = (req, res) => {
  if (!users || users.length === 0) {
    return res
      .status(404)
      .json({
      message: 'Users not found'
    });
  }

  return res
    .status(200)
    .json({
      message: "All users",
      users,
    });
};

export const createUser = (req, res) => {
  const {
    id,
    name
  } = req.body;

  if (!id || !name) {
    return res
      .status(400)
      .json({
        message: 'We need params to create an user'
      });
  }

  const isTheSameId = users.find(user => user.id === id);
  if (isTheSameId) {
    return res
      .status(400)
      .json({
        message: `User exits ${id}`,
      });
  }

  const newUser = {
    id,
    name,
  };

  users.push({ ...newUser, });
  return res
    .status(201)
    .json({
      message: `User created id: ${id}, name: ${name}`,
    });
};

export const updateUser = (req, res) => {
  const { id, } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        message: "Its neccesary user id",
      });
  }

  const {
    name
  } = req.body;

  if (!name) {
    return res
      .status(400)
      .json({
        message: 'Nothing to update',
      });
  }

  const currentUser = users.find(user => user.id === +id);
  if (!currentUser) {
    return res
      .status(400)
      .json({
        message: 'User not found',
      });
  }

  const updatedUser = {
    ...currentUser,
    name: name ?? currentUser.name,
  };

  const userIndex = users.findIndex(user => user.id === +id);
  if (userIndex === -1) {
    return res
      .status(400)
      .json({
        message: 'User not found',
      });
  }

  users.splice(userIndex, 1, updatedUser);

  return res
    .status(201)
    .json({
      message: `User updated. id: ${currentUser.id}`,
    });
};

export const deleteUser = (req, res) => {
  const { 
    id, 
  } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({
        message: "Its neccesary user id",
      });
  }

  const userIndex = users.findIndex(user => user.id === +id);
  if (userIndex === -1) {
    return res
      .status(400)
      .json({
        message: 'User not found',
      });
  }

  users.splice(userIndex, 1);

  return res
    .status(200)
    .json({
      message: 'User deleted',
    });
};

export const assignUserBook = (req, res) => {
  // TODO: crear posible funcionalidad para asociar libros a usuarios
}