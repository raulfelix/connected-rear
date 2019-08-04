'use strict'

const Project = use('App/Models/Project')

class ProjectsController {
  async create({ auth, request, response }) {
    try {
      const { title, description, tags } = request.all()
      const project = new Project()
      project.title = title
      project.description = description
      project.user_id = auth.user.id 
      project.start_date = new Date()
      project.end_date = new Date()
      await project.save()

      await project.tags().attach(tags.map(t => t.id))

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
