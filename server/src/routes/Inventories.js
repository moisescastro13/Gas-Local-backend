const { Router } = require('express');
const router = Router();

const InvenrotiesCnt = require('../controllers/Inventories');

router.get('/', InvenrotiesCnt.getAllInventories);
router.get('/:id', InvenrotiesCnt.getOneInventorie);
router.put('/:id', InvenrotiesCnt.updateInventorie);

module.exports = router;