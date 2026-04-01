let products = [
  { id: 1, name: 'Laptop',  price: 999.99, stock: 10 },
  { id: 2, name: 'Monitor', price: 299.99, stock: 25 },
];

const getProducts    = (req, res) => res.json({ success: true, count: products.length, data: products });

const getProductById = (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, message: 'Product not found' });
  res.json({ success: true, data: product });
};

const createProduct = (req, res) => {
  const { name, price, stock } = req.body;
  if (!name || !price) return res.status(400).json({ success: false, message: 'Name and price are required' });

  const newProduct = { id: products.length + 1, name, price, stock: stock || 0 };
  products.push(newProduct);
  res.status(201).json({ success: true, data: newProduct });
};

const updateProduct = (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Product not found' });

  products[index] = { ...products[index], ...req.body };
  res.json({ success: true, data: products[index] });
};

const deleteProduct = (req, res) => {
  const index = products.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ success: false, message: 'Product not found' });

  products.splice(index, 1);
  res.json({ success: true, message: 'Product deleted' });
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
