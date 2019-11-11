'use strict'

const Helpers = use('Helpers')
const Project = use('App/Models/Project')

class ProjectsController {
  async create({ auth, request, response }) {
    try {
      const user = await auth.getUser()
      const { title, description, tags } = request.all()
      const project = new Project()
      project.title = title
      project.description = description
      project.user_id = user.id 
      project.start_date = new Date()
      project.end_date = new Date()
      await project.save()

      await project.tags().attach(tags.map(t => t.id))

      return response.json({
        status: 'success',
        id: project.id
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error
      })
    }
  }

  async createComplete({ auth, request, response }) {
    try {
      const user = await auth.getUser()
      const { title, description, file } = request.all()

      const profilePic = request.file(file.filename, {
        types: ['image'],
        size: '2mb'
      })
    
      await profilePic.move(Helpers.tmpPath('uploads'), {
        overwrite: true
      })
    
      if (!profilePic.moved()) {
        return profilePic.error()
      }

      const project = new Project()
      project.title = title
      project.description = description
      project.images = profilePic;
      await project.save()

      return response.json({
        status: 'success',
        project
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error
      })
    }
  }

  async getById({ auth, request, response }) {
    try {
      await auth.check()
      const { id } = request.all()
      const project = await Project.query()
        .with('tags')
        .where('id', id)
        .fetch()
      const p = project.rows[0]
      const res = {
        project: p
      }
      return response.json(res)
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error
      })
    }
  }


  async byUser({ auth, request, response }) {
    try {
      const projects = await Project.query()
        .with('tags')
        .where('user_id', auth.user.id)
        .orderBy('start_date')
        .fetch()
      return response.json({
        status: 'success',
        projects
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error
      })
    }
  }

  async recent({ request, response }) {
    try {
      const projects = await Project.query()
        .with('tags')
        .limit(5)
        .fetch()
      return response.json({
        status: 'success',
        projects
      })
    } catch (error) {
      return response.status(400).json({
        status: 'error',
        error
      })
    }
  }
}

module.exports = ProjectsController
