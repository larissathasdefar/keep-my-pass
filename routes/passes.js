const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/passes')

router.get('/', Ctrl.getAll)
router.post('/', Ctrl.create)
router.put('/:id', Ctrl.update)
router.delete('/:id', Ctrl.destroy)

module.exports = router.routes()
