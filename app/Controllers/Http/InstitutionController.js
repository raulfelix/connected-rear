"use strict"

const Database = use("Database")

class InstitutionController {
  async find({ request, response, auth }) {
    try {
      const { term } = request.all()
      const rows = await Database
        .table('institutions')
        .select('id', 'name')
        .whereRaw('LOWER("name") LIKE ? LIMIT 10', `%${term.toLowerCase()}%`)

      return response.json({
        status: "success",
        data: rows
      })
    } catch (error) {
      return response.status(400).json({
        error
      })
    }
  }

  async get({ request, response, auth }) {
    try {
      const { id } = request.all()
      const o = await Database
        .table('institutions')
        .where('id', id)
      return response.json({
        status: "success",
        data: o
      })
    } catch (error) {
      return response.status(400).json({
        error
      })
    }
  }
}

module.exports = InstitutionController