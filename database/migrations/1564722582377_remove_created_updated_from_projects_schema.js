'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RemoveCreatedUpdatedFromProjectsSchema extends Schema {
  up () {
    this.table('projects', (table) => {
      table.dropColumn('created_at')
      table.dropColumn('updated_at')
    })
  }

  down () {
    this.table('projects', (table) => {
      table.date('created_at')
      table.date('updated_at')
    })
  }
}

module.exports = RemoveCreatedUpdatedFromProjectsSchema
