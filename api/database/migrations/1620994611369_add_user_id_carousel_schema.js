'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdCarouselSchema extends Schema {
  up () {
    this.table('carousels', (table) => {
      // alter table
      table.integer('user_id')
.references('id')
.inTable('users')
.onUpdate('CASCADE')
.onDelete('CASCADE')
    })
  }

  down () {
    this.table('carousels', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdCarouselSchema
