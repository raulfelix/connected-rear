'use strict'

/*
|--------------------------------------------------------------------------
| InstitutionSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
var fs = require('fs');

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')

class InstitutionSeeder {
  async run () {
    fs.readFile('./database/nsw_schools.json', 'utf8', async (err, data) => {
      if (err) {
        console.log(err)
        return;
      }
      try {
        let asJson = JSON.parse(data);
        const rows = [];
        asJson.forEach((j) => {
          rows.push({
            name: j.School_name,
            street_1: j.Street,
            postcode: j.Postcode,
            suburb: j.Town_suburb,
            state: 'NSW',
            country: 'Australia',
            phone: j.Phone,
            email: j.School_Email,
            website: j.Website
          })
        });
        await Database
          .from('institutions')
          .insert(rows);
      } catch (e) {
        console.log(e)
      }
    });
  }
}

module.exports = InstitutionSeeder
