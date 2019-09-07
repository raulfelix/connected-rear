'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserLoginFieldsSchema extends Schema {
  up () {
    this.table('users', (table) => {
      // alter table
      table.string('avatar')
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropColumn('avatar')
    })
  }
}

module.exports = AddUserLoginFieldsSchema
