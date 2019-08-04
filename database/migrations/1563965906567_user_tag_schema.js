'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserTagSchema extends Schema {
  up () {
    this.create('user_tag', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('tag_id').unsigned().references('id').inTable('tags')
    })
  }

  down () {
    this.drop('user_tag')
  }
}

module.exports = UserTagSchema
