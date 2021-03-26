//  express biblioteca para criar o servidor
const express = require('express');
//  Router vai criar as rotas
const routes = express.Router();

const views = __dirname + "/views/"

const profile = {
    name: "wander",
    avatar: "https://avatars.githubusercontent.com/u/48796830?v=4",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
}

// request, reponse

routes.get('/', (req,res) => res.render(views + "index"))
routes.get('/job', (req,res) => res.render(views + "job"))
routes.get('/job/edit', (req,res) => res.render(views + "job-edit"))
routes.get('/profile', (req,res) => res.render(views + "profile", { profile }))


    
// exporta as rotas

module.exports = routes;