const express = require('express');
const router = express.Router();

let products = [
  { id: 1, name: "Laptop", price: 700 },
  { id: 2, name: "Mouse", price: 20 }
];

router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id == req.params.id);
  product ? res.json(product) : res.status(404).json({ error: "No encontrado" });
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  newProduct.id = products.length + 1;
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    products[index] = { ...products[index], ...req.body };
    res.json(products[index]);
  } else {
    res.status(404).json({ error: "No encontrado" });
  }
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id == req.params.id);
  if (index !== -1) {
    const deleted = products.splice(index, 1);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: "No encontrado" });
  }
});

module.exports = router;