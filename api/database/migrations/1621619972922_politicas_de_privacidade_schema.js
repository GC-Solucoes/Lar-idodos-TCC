'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PoliticasDePrivacidadeSchema extends Schema {
  up () {
    this.create('politicas_de_privacidades', (table) => {
      table.increments()
      table.text('PoliticaPrivacidade').notNullable()
       table.timestamps()
    })
  }

  down () {
    this.drop('politicas_de_privacidades')
  }
}

module.exports = PoliticasDePrivacidadeSchema
