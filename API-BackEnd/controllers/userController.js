// Simulated in-memory data (replace with DB calls)
let users = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith',    email: 'bob@example.com' },
];

// GET /api/users
const getUsers = (req, res) => {
  res.json({ success: true, count: users.length, data: users });
};

// GET /api/users/:id
const getUserById = (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
};

// POST /api/users
const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ success: false, message: 'Name and email are required' });

  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json({ success: true, data: newUser });
};

// PUT /api/users/:id
const updateUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });

  users[index] = { ...users[index], ...req.body };
  res.json({ success: true, data: users[index] });
};

// DELETE /api/users/:id
const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'User not found' });

  users.splice(index, 1);
  res.json({ success: true, message: 'User deleted' });
};

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
