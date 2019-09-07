'use strict'

const User = use('App/Models/User')

class SocialController {
  async redirect ({ ally }) {
    await ally.driver('google').redirect()
  }

  async callback ({ ally, auth, response }) {
    try {
      const gUser = await ally.driver('google').getUser()

      // user details to be saved
      const userDetails = {
        email: gUser.getEmail(),
        token: gUser.getAccessToken(),
        avatar: gUser.getAvatar(),
        login_source: 'google'
      }

      const whereClause = {
        email: gUser.getEmail()
      }

      const user = await User.findOrCreate(whereClause, userDetails)

      if (!user.avatar) {
        user.avatar = userDetails.avatar
        await user.save()
      }

      const t = await auth.generate(user, null, {
        expiresIn: gUser.getExpires()
      })

      response.redirect('http://localhost:3001/login/google?token=' + t.token)
      return 'Logged in'
    } catch (error) {
      return 'Unable to authenticate. Try again later'
    }
  }
}

module.exports = SocialController
