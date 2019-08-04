'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTypeToUsersSchema extends Schema {
  up () {
    this.alter('users', (table) => {
      table.string('type', 50).notNullable().defaultTo('edu')
    })
  }

  down () {
    this.alter('users', (table) => {
      table.dropColumn('type')
    })
  }
}

module.exports = AddTypeToUsersSchema
