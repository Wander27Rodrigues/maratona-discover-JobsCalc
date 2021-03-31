//  express biblioteca para criar o servidor
const express = require('express');
//  Router vai criar as rotas
const routes = express.Router();

const views = __dirname + "/views/"

const profile = {
    name: "wander",
    avatar: "http://github.com/wander27Rodrigues.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
}

// array - agrupando dados
const jobs = []

// request, reponse

routes.get('/', (req,res) => res.render(views + "index"))
routes.get('/job', (req,res) => res.render(views + "job"))
routes.post('/job', (req,res) => {
    //req.body = {name: 'Wander Alisson Rodrigues Souza','daily-hours': '2','total-hours': '2'}
    jobs.push(req.body)
    return res.redirect('/')
})
routes.get('/job/edit', (req,res) => res.render(views + "job-edit"))
routes.get('/profile', (req,res) => res.render(views + "profile", { profile }))


    
// exporta as rotas

module.exports = routes;