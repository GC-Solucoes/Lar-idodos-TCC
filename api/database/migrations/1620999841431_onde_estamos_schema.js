'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OndeEstamosSchema extends Schema {
  up () {
    this.create('onde_estamos', (table) => {
      table.increments()
      table.string('ondeEstamosImagem', 500)
      table.string('ondeEstamosTitulo').notNullable()
      table.string('ondeEstamosAddress').notNullable()
      table.string('ondeEstamosTel').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('onde_estamos')
  }
}

module.exports = OndeEstamosSchema
