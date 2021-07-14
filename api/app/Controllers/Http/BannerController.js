'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with banners
 */

const Banner = use("App/Models/Banner");
//imagebs
const Helpers = use('Helpers')
const Log = use('App/Models/Log');
class BannerController {

  // listar todos os arquivos

  async index({ request, response, view }) {
    const banners = await Banner.query().with('user').fetch();

    return banners;
  }

  //GETBYID

  async show({ request, response, view, params }) {
    const banners = await Banner.findOrFail(params.id);

    return banners;
  }


  //criar novos banners no banco
  async store({ request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const { links } = request.all();
    const file = request.file('imagens', {
      types: ['image'],
      size: '4mb'
    })
    const imagens = `${file.clientName}`
    const banner = await Banner.create({ imagens, links, user_id: id });
    const logs = await Log.create({ Controller: 'Banner', Action: 'Criar', user_id: id });

    // imagens

    await file.move(Helpers.tmpPath('upload/banner'), {

      overwrite: false
    })

    if (!file.moved()) {
      return file.error()
    }

    return banner, logs, response.status(200).send({ message: 'Banner Criado' });
  }


  // atualizar informações
  async update({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const banner = await Banner.findOrFail(params.id);
    const { links } = request.all();
    const file = request.file('imagens', {
      types: ['image'],
      size: '4mb'
    })

    const logs = await Log.create({ Controller: 'Banner', Action: 'Editar', user_id: id });


    if (file) {
      const imagens = this.imagens = `${file.clientName}`

      banner.merge({ imagens, links, user_id: id });

      await banner.save();
      await file.move(Helpers.tmpPath('uploads'), {

        overwrite: false
      })
      if (!file.moved()) {
        return file.error()
      }


    } else {

      banner.merge({ links, user_id: id });
      await banner.save();

    }


    //



    return banner, logs, response.status(200).send({ message: 'Banner Editado' });
  }


  //remover
  async destroy({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const banner = await Banner.findOrFail(params.id);
    const logs = await Log.create({ Controller: 'Banner', Action: 'Deletar', user_id: id });
    await banner.delete();
    return logs, response.status(200).send({ message: 'Banner Removido' });
  }
}

module.exports = BannerController
