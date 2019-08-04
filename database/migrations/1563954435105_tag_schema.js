'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TagSchema extends Schema {
  up () {
    this.create('tags', (table) => {
      table.increments()
      table.string('name', 250).notNullable()
    })
  }

  down () {
    this.drop('tags')
  }
}

module.exports = TagSchema
