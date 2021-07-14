'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdUserSchema extends Schema {
  up () {
    this.table('users', (table) => {
       // alter table
       table.integer('user_id')
       .references('id')
       .inTable('users')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
    })
  }

  down () {
    this.table('users', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdUserSchema
