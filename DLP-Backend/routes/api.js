module.exports = [
  {
    model: 'product',
    path: '/product',
    handler: 'find',
  },
  {
    model: 'product',
    path: '/product/:id',
    handler: 'findById',
  },
]

