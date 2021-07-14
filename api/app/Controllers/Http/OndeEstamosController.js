'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with banners
 */
const OndeEstamos = use("App/Models/OndeEstamos");
const Helpers = use('Helpers');
const Log = use('App/Models/Log');

class OndeEstamosController {

  //listar todos
  async index({ request, response, view }) {
    const ondeEstamos = await OndeEstamos.query().with('user').fetch();

    return ondeEstamos;
  }

  //GETBYID

  async show({ request, response, view, params }) {
    const ondeEstamos = await OndeEstamos.findOrFail(params.id);

    return ondeEstamos;
  }

  //criar novos banners no banco
  async store({ request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const { ondeEstamosAddress, ondeEstamosTitulo, ondeEstamosTel } = request.all();
    const file = request.file('ondeEstamosImagem', {
      types: ['image'],
      size: '4mb'
    })
    const ondeEstamosImagem = `${file.clientName}`
    const ondeEstamos = await OndeEstamos.create({ ondeEstamosImagem, ondeEstamosAddress, ondeEstamosTitulo, ondeEstamosTel, user_id: id });
    const logs = await Log.create({ Controller: 'OndeEstamos', Action: 'Criar', user_id: id });

    // imagens

    await file.move(Helpers.tmpPath('upload/OndeEstamos'), {

      overwrite: false
    })

    if (!file.moved()) {
      return file.error()
    }

    return ondeEstamos, logs, response.status(200).send({ message: 'Onde Estamos Criado' });
  }


  // atualizar informações
  async update({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const ondeEstamos = await OndeEstamos.findOrFail(params.id);
    const { ondeEstamosAddress, ondeEstamosTitulo, ondeEstamosTel } = request.all();
    const file = request.file('ondeEstamosImagem', {
      types: ['image'],
      size: '4mb'
    })

    const logs = await Log.create({ Controller: 'OndeEstamos', Action: 'Editar', user_id: id });

    if (file) {
      const ondeEstamosImagem = this.ondeEstamosImagem = `${file.clientName}`
      ondeEstamos.merge({ ondeEstamosAddress, ondeEstamosImagem, ondeEstamosTitulo, ondeEstamosTel, user_id: id });
      await ondeEstamos.save();
      await file.move(Helpers.tmpPath('uploadsOndeEstamos'), {

        overwrite: false
      })

      if (!file.moved()) {
        return file.error()
      }

    } else {
      ondeEstamos.merge({ ondeEstamosAddress, ondeEstamosTitulo, ondeEstamosTel, user_id: id });
      await ondeEstamos.save();
    }




    return ondeEstamos, logs, response.status(200).send({ message: 'Onde Estamos Editado' });
  }


  //remover
  async destroy({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const ondeEstamos = await OndeEstamos.findOrFail(params.id);
    const logs = await Log.create({ Controller: 'OndeEstamos', Action: 'Deletar', user_id: id });
    await ondeEstamos.delete();
    return logs, response.status(200).send({ message: 'Onde Estamos Removido' });
  }

}

module.exports = OndeEstamosController
