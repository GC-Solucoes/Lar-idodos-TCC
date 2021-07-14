'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */


const Carousel = use("App/Models/Carousel");
//imagebs
const Helpers = use('Helpers')
const Log = use('App/Models/Log');


class CarouselController {

  // listar todos os arquivos

  async index({ request, response, view }) {
    const carousel = await Carousel.query().with('user').fetch();

    return carousel;
  }

  //GETBYID

  async show({ request, response, view, params }) {
    const carousel = await Carousel.findOrFail(params.id);

    return carousel;
  }

  //criar novos banners no banco
  async store({ request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const { carouselTitulo } = request.all();
    const file = request.file('carouselImagens', {
      types: ['image'],
      size: '4mb'
    })
    const carouselImagens = `${file.clientName}`
    const carousel = await Carousel.create({ carouselImagens, carouselTitulo, user_id: id });
    const logs = await Log.create({ Controller: 'Carousel', Action: 'Criar', user_id: id });

    // imagens

    await file.move(Helpers.tmpPath('uploadsCarousel'), {

      overwrite: false
    })

    if (!file.moved()) {
      return file.error()
    }

    return carousel, logs, response.status(200).send({ message: 'Carousel Criado' });
  }

  // atualizar informações
  async update({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const carousel = await Carousel.findOrFail(params.id);
    const { carouselTitulo } = request.all();
    const file = request.file('carouselImagens', {
      types: ['image'],
      size: '4mb'
    })

    const logs = await Log.create({ Controller: 'Carousel', Action: 'Editar', user_id: id });

    if (file) {
      const carouselImagens = this.carouselImagens = `${file.clientName}`
      carousel.merge({ carouselImagens, carouselTitulo, user_id: id });

      await carousel.save();
      await file.move(Helpers.tmpPath('upload/Carousel'), {

        overwrite: false
      })

      if (!file.moved()) {
        return file.error()
      }
    } else {
      carousel.merge({ carouselTitulo, user_id: id });

      await carousel.save();
    }




    return carousel, logs, response.status(200).send({ message: 'Carousel Editado' });
  }

  //remover
  async destroy({ params, request, response, auth }) {
    const { Controller, Action } = request.all();
    const { id } = auth.user;
    const carousel = await Carousel.findOrFail(params.id);
    const logs = await Log.create({ Controller: 'Carousel', Action: 'Deletar', user_id: id });
    await carousel.delete();
    return logs, response.status(200).send({ message: 'Carousel Removido' });
  }


}

module.exports = CarouselController
