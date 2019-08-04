'use strict'

/*
|--------------------------------------------------------------------------
| TagSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class TagSeeder {
  async run () {
    const rows = [
      { name: 'art' },
      { name: 'science' },
      { name: 'engineering' },
      { name: 'public speaking' },
      { name: 'architecture' },
      { name: 'management' },
      { name: 'project management' },
      { name: 'religion' },
      { name: 'history' },
      { name: 'ancient history' },
      { name: 'modern history' },
      { name: 'media and communications' },
      { name: 'government' },
      { name: 'comics' },
      { name: 'journalism' },
      { name: 'photography' },
      { name: 'crafts' },
      { name: 'dance' },
      { name: 'design' },
      { name: 'fashion' },
      { name: 'film & video' },
      { name: 'food' },
      { name: 'games' },
      { name: 'publishing' },
      { name: 'technology' },
      { name: 'theater' }
    ]
    await Database
      .from('tags')
      .insert(rows);
  }
}

module.exports = TagSeeder
