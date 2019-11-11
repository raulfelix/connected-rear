'use strict'

const Database = use('Database')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')
Route.on('/projects').render('Projects.index')

Route
  .get('users/:id', 'UserController.show')
  .middleware('auth')

Route.post('/signup', 'UserController.signup')
Route.post('/login', 'UserController.login')
Route.post('/logout', 'UserController.logout')

Route.post('/user/profile', 'UserController.createProfile').middleware('auth')
Route.put('/user/profile', 'UserController.updateProfile').middleware('auth')
Route.get('/user/profile', 'UserController.profile').middleware('auth')

//
// institutions
Route.get('/institutions', 'InstitutionController.find')
Route.get('/institution',  'InstitutionController.get')

//
// projects
Route.get('/projects/recent', 'ProjectsController.recent')
Route.get('/projects/user', 'ProjectsController.byUser').middleware('auth')
Route.get('/project', 'ProjectsController.getById').middleware('auth')
Route.post('/project', 'ProjectsController.create').middleware('auth')
Route.post('/project/complete', 'ProjectsController.createComplete').middleware('auth')
//
// tags
Route.get('/tags', 'TagsController.find')
Route.post('/tags', 'TagsController.create')


// ally routes
Route.get('login/google', 'SocialController.redirect')
Route.get('authenticated/google', 'SocialController.callback')