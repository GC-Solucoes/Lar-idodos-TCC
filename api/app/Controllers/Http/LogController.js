'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with logs
 */

const Log = use('App/Models/Log');

class LogController {

  async index ({ request, response }) {
    const logs = await Log.query().with('user').fetch();
  ;

    return logs;
  }

  async store ({ request, response }) {
  }

  async update ({ params, request, response }) {
  }

  async destroy ({ params, request, response }) {
  }
}

module.exports = LogController
