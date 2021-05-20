const { Router } = require('express');
const router = Router();

const ProvidersCnt = require('../controllers/Providers');

router.get('/', ProvidersCnt.getAllProviders);
router.get('/:id', ProvidersCnt.getOneProvider);
router.post('/', ProvidersCnt.newProvider);
router.put('/:id',ProvidersCnt.updateProvider);
router.delete('/:id',ProvidersCnt.deleteProvider);

module.exports = router;