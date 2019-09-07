'use strict'

const Logger = use('Logger')
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')

class UserController {
  async signup({ request, response }) {
    Logger.info('Request: signup', request.all())
    try {
      const { username, email, password, type } = request.all()
      const user = new User()
      user.username = username
      user.email = email
      user.password = password
      user.type = type
      await user.save()

      // const profile = new Profile();
      // profile.user_id = user.id
      // profile.first_name = ''
      // profile.last_name = ''
      // await profile.save()

      return response.json({
        status: 'success',
        email
      })
    } catch (error) {
      return response.json({
        status: 'error',
        error
      })
    }
  }

  async login ({ request, auth, response }) {
    Logger.info('login', request.all())
    try {
      const { email, password } = request.all()
      const { token } = await auth.attempt(email, password)
      const user = await User.findBy('email', email)
      const profile = await user.profile().fetch()
      return response.json({
        status: 'success',
        isProfileComplete: (profile && profile.first_name),
        token
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        error
      })
    }
  }

  async logout ({ request, auth, response }) {
    Logger.info('logout', request.all())
    try {
      await auth.logout()
      return response.json({
        status: 'success'
      })
    } catch (error) { 
      return response.status(400).send({
        status: 'error',
        error
      })
    }
  }

  async profile ({ request, auth, response }) {
    try {
      const user = await auth.user
      const userProfile = await user.profile().fetch()
      Logger.info('userProfile', userProfile)

      const school = await userProfile.institution().fetch()
      userProfile.institution = school;
      return response.json({
        status: 'success',
        profile: userProfile
      })
    } catch (error) {
      return response.json({
        status: 'error',
        error
      })
    }
  }

  async createProfile ({ request, auth, response }) {
    try {
      const { firstName, lastName, position, institutionId } = request.all();
      const profile = new Profile()
      profile.first_name = firstName
      profile.last_name = lastName
      profile.institution_id = institutionId
      profile.position = position
      await auth.user.profile().save(profile)
      return response.json({
        status: 'success'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        error
      })
    }
  }

  async updateProfile ({ request, auth, response }) {
    try {
      const { firstName, lastName, position, institutionId } = request.all()
      const profile = await auth.user.profile().fetch()
      profile.first_name = firstName
      profile.last_name = lastName
      profile.institution_id = institutionId
      profile.position = position
      await profile.save()
      return response.json({
        status: 'success'
      })
    } catch (error) {
      return response.status(400).send({
        status: 'error',
        error
      })
    }
  }
}

module.exports = UserController
