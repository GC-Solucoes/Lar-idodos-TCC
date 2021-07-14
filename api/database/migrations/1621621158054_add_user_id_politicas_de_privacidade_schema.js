'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddUserIdPoliticasDePrivacidadeSchema extends Schema {
  up () {
    this.table('politicas_de_privacidades', (table) => {
       // alter table
       table.integer('user_id')
       .references('id')
       .inTable('users')
       .onUpdate('CASCADE')
       .onDelete('CASCADE')
    })
  }

  down () {
    this.table('politicas_de_privacidades', (table) => {
      // reverse alternations
      table.dropColumn('user_id')
    })
  }
}

module.exports = AddUserIdPoliticasDePrivacidadeSchema
