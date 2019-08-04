'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddSchoolToProfileSchema extends Schema {
  up () {
    this.table('add_school_to_profiles', (table) => {
      this.alter('profiles', (table) => {
        table.integer('institution_id').unsigned().references('id').inTable('institutions')
        table.string('position', 250)
      })
    })
  }

  down () {
    this.table('add_school_to_profiles', (table) => {
      this.alter('profiles', (table) => {
        table.dropColumn('institution_id')
        table.dropColumn('position')
      })
    })
  }
}

module.exports = AddSchoolToProfileSchema
