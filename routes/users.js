const Router = require('koa-router')
const router = new Router()
const Ctrl = require('../controllers/users')

router.post('/signup', Ctrl.create)
// router.post('/login', Ctrl.login)
// router.put('/', Ctrl.update)
// router.delete('/', Ctrl.destroy)

module.exports = router.routes()
