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
const jobs = [
    {
    id: 1,
    name: "Pizza Guloso",
    "daily-hours": 2,
    "total-hours": 60,
    created_at: Date.now()
    },
    {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now()   
    }
]

// request, reponse

routes.get('/', (req,res) => res.render(views + "index", { jobs }))
routes.get('/job', (req,res) => res.render(views + "job"))
routes.post('/job', (req,res) => {
    //req.body = {name: 'Wander Alisson Rodrigues Souza','daily-hours': '2','total-hours': '2'}
    
    // logica and/Or
    const lastId = jobs[jobs.length - 1]?.id || 1;

    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        "daily-hours": req.body["daily-hours"],
        "total-hours": req.body["total-hours"],
        created_at: Date.now() // atribuindo data de hoje
    })
    return res.redirect('/')
})
routes.get('/job/edit', (req,res) => res.render(views + "job-edit"))
routes.get('/profile', (req,res) => res.render(views + "profile", { profile }))


    
// exporta as rotas

module.exports = routes;