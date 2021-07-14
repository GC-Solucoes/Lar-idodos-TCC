'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdPostagemSchema extends Schema {
  up () {
    this.table('postagems', (table) => {
      // alter table
      table.integer('user_id')
.references('id')
.inTable('users')
.onUpdate('CASCADE')
.onDelete('CASCADE')
    })
  }

  down () {
    this.table('postagems', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdPostagemSchema
