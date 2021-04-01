//  express biblioteca para criar o servidor
const express = require('express');
//  Router vai criar as rotas
const routes = express.Router();

const views = __dirname + "/views/"

const Profile = {
  data: {
    name: "wander",
    avatar: "http://github.com/wander27Rodrigues.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "valuer-hour": 75,
  },

  controllers: {
      index(req, res){
          return res.render(views + "profile", { profile: Profile.data })
      },

      update(){

      }

  }
}

const job = {
    data: [
    // array - agrupando dados  
    {
    id: 1,
    name: "Pizza Guloso",
    "daily-hours": 2,
    "total-hours": 1,
    created_at: Date.now(),
    },
    {
    id: 2,
    name: "OneTwo Project",
    "daily-hours": 3,
    "total-hours": 47,
    created_at: Date.now(),
    }
],
    controllers: {
        index(req,res) {    
                const updateJobs = job.data.map((job) => {
                // ajustes no job
                const remaining = job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'
            
                return {
                    // ... - espalhamento
                    ...job,
                    remaining,
                    status,
                    budget: Profile.data["valuer-hour"] * job["total-hours"],
                }
                })
                
                return res.render(views + "index", { jobs: updateJobs })
            },

            create(req,res){
                return res.render(views + "job")
            },

            save(req, res) {
                 //req.body = {name: 'Wander Alisson Rodrigues Souza','daily-hours': '2','total-hours': '2'}
    
                // logica and/Or
                const lastId = job.data[job.data.length - 1]?.id || 1;

                job.data.push({
                id: lastId + 1,
                name: req.body.name,
                "daily-hours": req.body["daily-hours"],
                "total-hours": req.body["total-hours"],
                created_at: Date.now() // atribuindo data de hoje
            })

            return res.redirect('/')

            }
        },
        services: {
            remainingDays(job) {
                // calculo de tempo restante
                const remainingDays = (job["total-hours"] / job["daily-hours"]).toFixed()
        
                const createdDate = new Date(job.created_at)
                const dueDay = createdDate.getDate() + Number(remainingDays)
                const dueDataInMs = createdDate.setDate(dueDay)
            
                const timeDiffnMs = dueDataInMs - Date.now()
                
                // Tranformar milli em dias
                const dayInMs = 1000 * 60 * 60 * 24 
                const dayDiff = Math.floor(timeDiffnMs / dayInMs)
        
                // restam x dias
                return dayDiff
        }
        }

    }


// request, reponse
routes.get('/', job.controllers.index)
routes.get('/job', job.controllers.create)
routes.post('/job', job.controllers.save)
routes.get('/job/edit', (req,res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)


    
// exporta as rotas

module.exports = routes;