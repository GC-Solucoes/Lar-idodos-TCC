'use strict'


const User = use('App/Models/User');
const Log = use('App/Models/Log');
class UserController {

// listar todos os usuários

  async index ({ request, response, view }) {
    const users = await User.all();

    return users;
  }

  async show ({ request, response, view, params }) {
    const users = await User.findOrFail(params.id);

    return users;
  }




  //criar novos usuários no banco
  async store ({ request, response, auth }) {

    // const data = request.only(['username', 'email', 'password']);
    const {Controller, Action} = request.all();
  const {id}= auth.user;
       const {username, email, password} = request.all();
    // procurando pelo usuário no banco de dados
      const userExists = await User.findBy('email', email)
      // se o usuário existir
      if (userExists) {
        return response
          .status(400)
          .send({ message: { error: 'Usuário ja Cadastrado' } })
      }
    const user = await User.create({username, email, password, user_id:id});
    const logs = await Log.create({ Controller: 'User', Action:'Criar', user_id: id});

    return user, logs, response.status(200).send({message: 'Usuário Criado'});

  }

// atualizar informações
  async update ({ params, request, response, auth }) {
    const {Controller, Action} = request.all();
    const {id}= auth.user;
    const user = await User.findOrFail(params.id);
    const {username, email, password} = request.all();

    user.merge({username, email, password, user_id:id});
    await user.save();
    const logs = await Log.create({ Controller: 'User', Action:'Editar', user_id:id});

    return user,logs, response.status(200).send({message: 'Usuário Editado'});
  }

//remover
  async destroy ({ params, request, response, auth }) {
    const {Controller, Action} = request.all();
    const {id}= auth.user;
const user = await User.findOrFail(params.id);

await user.delete();
const logs = await Log.create({ Controller:'User', Action:'Deletar',  user_id:id});
return logs, response.status(200).send({message: 'Usuário Deletado'});
  }

// login
async login({ request,  response, auth}) {

 try {

  const {Controller, Action} = request.all();
  // const {id} = auth.user;
   const { email, password} = request.all();


const token = await auth.attempt(email, password);
const logs = await Log.create({ Controller:'User', Action:'Login'});
return token;

 } catch (error) {

  return response.status(500).send({message: 'Usuário Não Cadastrado'})

 }


}

async logout({request, response, auth}) {
  const {Controller, Action} = request.all();
  const refreshToken = request.input('refreshToken');
  const logs = await Log.create({ Controller: 'User', Action: 'Logout'});

  await auth
    .authenticator('jwt')
    .revokeTokens([refreshToken], true)

return response.send({status : 200, "message" : 'Logout Feito'}), logs;

}

}
module.exports = UserController

