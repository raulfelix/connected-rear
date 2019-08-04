"use strict"

const Database = use("Database")
const Tag = use('App/Models/Tag')

class TagsController {
  async find({ request, response, auth }) {
    try {
      const { term } = request.all()
      const rows = await Database
        .table('tags')
        .whereRaw('LOWER("name") LIKE ? LIMIT 10', `%${term.toLowerCase()}%`)
      const data = rows.map(r => {
        const name = r.name;
        return {
          id: r.id,
          name: `${name.charAt(0).toUpperCase()}${name.substring(1, name.length)}`
        }
      })
      return response.json({
        status: "success",
        data
      })
    } catch (error) {
      return response.status(400).json({
        error
      })
    }
  }

  async create({ request, response }) {
    try {
      const { name } = request.all()
      const tag = await Tag.findOrCreate({ name: name.toLowerCase() })
      return response.json({
        status: "success",
        id: tag.id
      })
    } catch (error) {
      return response.status(400).json({
        error
      })
    }
  }
}

module.exports = TagsController