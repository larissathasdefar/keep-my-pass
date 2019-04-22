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
  const { username, password } = ctx.request.body
  const user = await User.findOne({ username })
  const pass = await Pass.findById(id)
  if (pass.user === user._id) {
    pass.password = password
    const updatedPass = await pass.save()
    ctx.body = updatedPass
  } else {
    ctx.status = 401
    ctx.body = { error: "Unauthorized" }
  }
}

async function destroy (ctx) {
  const id = ctx.params.id
  const { username } = ctx.request.body
  const user = await User.findOne({ username })
  const pass = await Pass.findById(id)
  if (pass.user === user._id) {
    const deletedPass = await pass.remove()
    ctx.body = deletedPass
  } else {
    ctx.status = 401
    ctx.body = { error: "Unauthorized" }
  }
}

module.exports = {
  getAll,
  create,
  update,
  destroy,
}
