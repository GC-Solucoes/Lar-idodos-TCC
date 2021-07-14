'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdOndeEstamosSchema extends Schema {
  up () {
    this.table('onde_estamos', (table) => {
      // alter table
      table.integer('user_id')
.references('id')
.inTable('users')
.onUpdate('CASCADE')
.onDelete('CASCADE')
    })
  }

  down () {
    this.table('onde_estamos', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdOndeEstamosSchema
