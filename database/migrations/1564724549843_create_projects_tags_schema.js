'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreateProjectsTagsSchema extends Schema {
  up () {
    this.create('project_tag', (table) => {
      table.increments()
      table.integer('project_id').unsigned().references('id').inTable('projects')
      table.integer('tag_id').unsigned().references('id').inTable('tags')
    })
  }

  down () {
    this.drop('project_tag')
  }
}

module.exports = CreateProjectsTagsSchema
