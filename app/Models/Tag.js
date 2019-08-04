'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tag extends Model {
  users () {
    return this.belongsToMany('App/Models/User').pivotTable('user_tag')
  }

  projects () {
    return this.belongsToMany('App/Models/Project').pivotTable('project_tag')
  }

  static get createdAtColumn () {
    return null
  }

  static get updatedAtColumn () {
    return null
  }
}

module.exports = Tag
