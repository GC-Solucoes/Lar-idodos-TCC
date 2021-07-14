'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostagemSchema extends Schema {
  up () {
    this.create('postagems', (table) => {
      table.increments()
      table.string('titulo').notNullable()
      table.text('textos').notNullable()
      table.string('links')
      table.timestamps()
    })
  }

  down () {
    this.drop('postagems')
  }
}

module.exports = PostagemSchema
