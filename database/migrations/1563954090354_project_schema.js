'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProjectSchema extends Schema {
  up () {
    this.create('projects', (table) => {
      table.increments()
      table.timestamps()
      table.string('title', 250).notNullable()
      table.text('description').notNullable()
      table.date('start_date').notNullable()
      table.date('end_date').notNullable()
      table.json('images')
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('institution_id').references('id').inTable('institutions')
    })
  }

  down () {
    this.drop('projects')
  }
}

module.exports = ProjectSchema