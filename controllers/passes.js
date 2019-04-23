const Pass = require('../models/pass')
const User = require('../models/user')

async function getAll (ctx) {
  const { username } = ctx.request.body
  const user = await User.findOne({ username })
  const passes = await Pass.find({ user: user._id })
  ctx.body = passes
}

async function create (ctx) {
  const { username, website, password } = ctx.request.body
  const user = await User.findOne({ username })
  const newPass = new Pass({
    website,
    password,
    user: user._id,
  })
  const savedPass = await newPass.save()
  ctx.body = savedPass
}

async function update (ctx) {
  const id = ctx.params.id
  const { password } = ctx.request.body
  const pass = await Pass.findById(id)
  pass.password = password
  const updatedPass = await pass.save()
  ctx.body = updatedPass
}

async function destroy (ctx) {
  const id = ctx.params.id
  const pass = await Pass.findById(id)
  const deletedPass = await pass.remove()
  ctx.body = deletedPass
}

module.exports = {
  getAll,
  create,
  update,
  destroy,
}
