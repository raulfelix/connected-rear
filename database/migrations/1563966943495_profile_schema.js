'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments()
      table.string('first_name', 250)
      table.string('last_name', 250)
      table.integer('age', 250)
      table.integer('user_id').unsigned().references('id').inTable('users')
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
