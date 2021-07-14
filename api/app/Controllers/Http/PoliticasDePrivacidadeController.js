'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with postagems
 */

 const PoliticasPrivacidade = use("App/Models/PoliticasDePrivacidade");
 const Log = use('App/Models/Log');



class PoliticasDePrivacidadeController {


 // listar todos os arquivos

 async index ({ request, response, view }) {
  const politicasPrivacidade = await PoliticasPrivacidade.query().with('user').fetch();

  return politicasPrivacidade;
}

//criar novos no banco
async store ({ request, response, auth }) {
  const {Controller, Action} = request.all();
const {id} = auth.user;

  const {PoliticaPrivacidade} = request.all();

  const politicasPrivacidade = await PoliticasPrivacidade.create({PoliticaPrivacidade, user_id: id});
  const logs = await Log.create({ Controller: 'Politcas De Privacidade', Action:'Criar', user_id: id});
  return politicasPrivacidade, logs, response.status(200).send({message: 'Politica  Criada'});
}

 //GETBYID

 async show({ request, response, view, params }) {
  const politicasPrivacidade = await PoliticasPrivacidade.findOrFail(params.id);

  return politicasPrivacidade;
}


// atualizar informações
async update ({ params, request, response, auth }) {
  const {Controller, Action} = request.all();
  const {id} = auth.user;
  const politicasPrivacidade = await PoliticasPrivacidade.findOrFail(params.id);
  const {PoliticaPrivacidade} = request.all();

  politicasPrivacidade.merge({PoliticaPrivacidade, user_id:id});
  const logs = await Log.create({ Controller: 'Politcas De Privacidade', Action:'Editar', user_id:id});
  await politicasPrivacidade.save();

  return politicasPrivacidade, logs, response.status(200).send({message: 'Politica Editado'});
}

//remover
async destroy ({ params, request, response, auth }) {
  const {Controller, Action} = request.all();
  const {id} = auth.user;
const politicasPrivacidade = await PoliticasPrivacidade.findOrFail(params.id);


const logs = await Log.create({ Controller:'Politcas De Privacidade', Action:'Deletar',user_id:id});

await politicasPrivacidade.delete();
return logs, response.status(200).send({message: 'Politcas Deletado'});
}


}

module.exports = PoliticasDePrivacidadeController
