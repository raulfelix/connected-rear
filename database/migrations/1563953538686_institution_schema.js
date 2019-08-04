'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class InstitutionSchema extends Schema {
  up () {
    this.create('institutions', (table) => {
      table.increments()
      table.timestamps()
      table.string('name').notNullable()
      table.string('phone')
      table.string('email')
      table.string('website')
      table.string('logo')
      table.string('street_1')
      table.string('suburb')
      table.string('postcode')
      table.string('state')
      table.string('country')
    })
  }

  down () {
    this.drop('institutions')
  }
}

module.exports = InstitutionSchema
