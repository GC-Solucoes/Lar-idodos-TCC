'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
// cruds usuario
// Route.resource('users', 'UserController').apiOnly();
Route.get('users', 'UserController.index').middleware('auth');
Route.get('users/:id', 'UserController.show').middleware('auth');
Route.post('users', 'UserController.store').middleware('auth');
Route.put('users/:id', 'UserController.update').middleware('auth');
Route.delete('users/:id', 'UserController.destroy').middleware('auth');
Route.post('/login', 'UserController.login');
Route.get('/logout', 'UserController.logout');
// crud banner
// Route.resource('banners', 'BannerController').apiOnly();
Route.get('banners', 'BannerController.index');
Route.get('banners/:id', 'BannerController.show');
Route.post('banners', 'BannerController.store').middleware('auth');
Route.put('banners/:id', 'BannerController.update').middleware('auth');
Route.delete('banners/:id', 'BannerController.destroy').middleware('auth');
//cruds postagem
// Route.resource('postagens', 'PostagemController').apiOnly();
Route.get('postagens', 'PostagemController.index');
Route.get('postagens/:id', 'PostagemController.show');
Route.post('postagens', 'PostagemController.store').middleware('auth');
Route.put('postagens/:id', 'PostagemController.update').middleware('auth');
Route.delete('postagens/:id', 'PostagemController.destroy').middleware('auth');
// logs
Route.get('logs', 'LogController.index');
//email
Route.post('sendmail', 'EmailController.store');
//Carousel Slide
Route.get('carousel', 'CarouselController.index');
Route.get('carousel/:id', 'CarouselController.show');
Route.post('carousel', 'CarouselController.store').middleware('auth');
Route.put('carousel/:id', 'CarouselController.update').middleware('auth');
Route.delete('carousel/:id', 'CarouselController.destroy').middleware('auth');
//onde estamos
Route.get('onde-estamos', 'OndeEstamosController.index');
Route.get('onde-estamos/:id', 'OndeEstamosController.show');
Route.post('onde-estamos', 'OndeEstamosController.store').middleware('auth');
Route.put('onde-estamos/:id', 'OndeEstamosController.update').middleware('auth');
Route.delete('onde-estamos/:id', 'OndeEstamosController.destroy').middleware('auth');
//politicas de privacidade
Route.get('politicas-de-privacidade', 'PoliticasDePrivacidadeController.index');
Route.get('politicas-de-privacidade/:id', 'PoliticasDePrivacidadeController.show');
Route.post('politicas-de-privacidade', 'PoliticasDePrivacidadeController.store').middleware('auth');
Route.put('politicas-de-privacidade/:id', 'PoliticasDePrivacidadeController.update').middleware('auth');
Route.delete('politicas-de-privacidade/:id', 'PoliticasDePrivacidadeController.destroy').middleware('auth');
