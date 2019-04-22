const User = require('../models/user')

async function create (ctx) {
  const newUser = new User(ctx.request.body)
  const savedUser = await newUser.save()
  ctx.body = savedUser
}

async function login (ctx) {
  const { username, password } = ctx.request.body
  let success = false

  await User.findOne({ username }, function(err, user) {
    if (err) throw err

    user.comparePassword(password, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        success = true
      }
    })
  })

  if (success) {
    ctx.body = { success }
  } else {
    ctx.status = 401
    ctx.body = { error: "Incorrect username or password." }
  }
}

async function update (ctx) {
  const { username, newPassword, oldPassword } = ctx.request.body
  let success = false

  await User.findOne({ username }, function(err, user) {
    if (err) throw err
    user.comparePassword(oldPassword, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        user.password = newPassword
        user.save()
        success = true
      }
    })
  })

  if (success) {
    ctx.body = { success }
  } else {
    ctx.status = 401
    ctx.body = { error: "Incorrect password." }
  }
}

async function destroy (ctx) {
  const { username, password } = ctx.request.body
  let success = false

  await User.findOne({ username }, function(err, user) {
    if (err) throw err
    user.comparePassword(password, function(err, isMatch) {
      if (err) throw err
      if (isMatch) {
        user.remove()
        success = true
      }
    })
  })

  if (success) {
    ctx.body = { success }
  } else {
    ctx.status = 401
    ctx.body = { error: "Incorrect password." }
  }
}

module.exports = {
  login,
  create,
  update,
  destroy,
}
