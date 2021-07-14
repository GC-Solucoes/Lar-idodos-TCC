'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Log extends Model {

  // para saber de qual usuário o log pertence
user(){
  return this.belongsTo('App/Models/User');
}

}


module.exports = Log
