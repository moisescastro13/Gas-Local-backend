const { Router } = require('express');
const router = Router();

const productCnt = require('../controllers/Products');

router.get('/', productCnt.getAllProducts)
router.get('/:id', productCnt.getOneProduct)
router.post('/', productCnt.newProduct)
router.put('/:id', productCnt.updateProduct);
router.delete('/:id', productCnt.deleteProduct)

module.exports = router;