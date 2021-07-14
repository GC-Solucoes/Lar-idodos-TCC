'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdLogsSchema extends Schema {
  up () {
    this.table('logs', (table) => {
      // alter table
      table.integer('user_id')
.references('id')
.inTable('users')
.onUpdate('CASCADE')
.onDelete('CASCADE')
    })
  }

  down () {
    this.table('logs', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdLogsSchema
