'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postagems
 */

const Postagem = use("App/Models/Postagem");
const Log = use('App/Models/Log');
class PostagemController {
 // listar todos os arquivos

async index ({ request, response, view }) {
  const postagens = await Postagem.query().with('user').fetch();

  return postagens;
}

//GETBYID

async show ({ request, response, view, params }) {
  const postagens = await Postagem.findOrFail(params.id);

  return postagens;
}

//criar novos usuários no banco
async store ({ request, response, auth }) {
  const {Controller, Action} = request.all();
const {id} = auth.user;

  const {titulo, textos, links} = request.all();

  const postagem = await Postagem.create({titulo, textos, links, user_id: id});
  const logs = await Log.create({ Controller: 'Postagem', Action:'Criar', user_id: id});
  return postagem, logs, response.status(200).send({message: 'Post Criado'});
}

// atualizar informações
async update ({ params, request, response, auth }) {
  const {Controller, Action} = request.all();
  const {id} = auth.user;
  const postagem = await Postagem.findOrFail(params.id);
  const {titulo, textos, links} = request.all();

  postagem.merge({titulo, textos, links, user_id:id});
  const logs = await Log.create({ Controller: 'Postagem', Action:'Editar', user_id:id});
  await postagem.save();

  return postagem,logs, response.status(200).send({message: 'Post Editado'});
}

//remover
async destroy ({ params, request, response, auth }) {
  const {Controller, Action} = request.all();
  const {id} = auth.user;
const postagem = await Postagem.findOrFail(params.id);


const logs = await Log.create({ Controller:'Postagem', Action:'Deletar',user_id:id});

await postagem.delete();
return logs, response.status(200).send({message: 'Post Deletado'});
}

}

module.exports = PostagemController
