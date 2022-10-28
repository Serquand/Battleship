import Players from './Players.js'
import Game from './Game.js'
import { Op } from 'sequelize'


//Creating and seeding the tables
export default async () => {
    await Players.sync()
        .then(async () => {
            await Players.findOrCreate({
                where: {
                    [Op.or]: [{ Pseudo: 'Marthieu2' }, { Email: 'matthieu.evuort@efrei.net' }], 
                },
                defaults: { 
                    id: "550c252f-6d23-4633-b06d-6c521c2499ef", 
                    Pseudo: 'Marthieu2', 
                    Email: 'matthieu.evuort@efrei.net',
                    Password: "$2b$10$et0e7wKewViQSOZlis8L9O1ebUWZRmpYwXjLOsRr0m93/8PPBEDZO" //Password: Marthieu2 
                }
            })

            await Players.findOrCreate({
                where: {
                    [Op.or]: [{ Pseudo: 'covowel03' }, { Email: 'marty.evuort@efrei.net' }], 
                }, 
                defaults: { 
                    id: "642284b9-e0eb-4561-9762-6b144330efba",
                    Pseudo: 'covowel03',
                    Email: 'marty.evuort@efrei.net',
                    Password: "$2b$10$hBvQayZH..jDbqCv8TZBVO7I3ZsXQtsH9E.6tJcp8URdQbBr4HYli" //Password: covowel03 
                }
            })

            await Players.findOrCreate({
                where: {
                    [Op.or]: [{ Pseudo: 'Serquand' }, { Email: 'esteban.vincent@efrei.net' }],
                }, 
                defaults: { 
                    Pseudo: 'Serquand',
                    Email: 'esteban.vincent@efrei.net',
                    id: "f51d2dff-ab57-4211-9ee2-eeada9a84b72",
                    Password: "$2b$10$jCPg6VirVIBE/usv1ddHPuuSdZ2.GWtMrWZ0AYWoWlSQoL8mRDpY6" //Password: Serquand
                }
            })
        })  

    Game.sync({ force: true })
        .then(() => {
            Game.create({
                result: "f51d2dff-ab57-4211-9ee2-eeada9a84b72",  
                player1: "f51d2dff-ab57-4211-9ee2-eeada9a84b72", 
                player2: "642284b9-e0eb-4561-9762-6b144330efba", 
                eloPlayer1: 800, 
                eloPlayer2: 800,
            })   

            Game.create({
                result: "f51d2dff-ab57-4211-9ee2-eeada9a84b72",  
                player1: "f51d2dff-ab57-4211-9ee2-eeada9a84b72", 
                player2: "550c252f-6d23-4633-b06d-6c521c2499ef", 
                eloPlayer1: 800, 
                eloPlayer2: 800,
            })   

            Game.create({
                result: "642284b9-e0eb-4561-9762-6b144330efba",  
                player1: "550c252f-6d23-4633-b06d-6c521c2499ef", 
                player2: "642284b9-e0eb-4561-9762-6b144330efba", 
                eloPlayer1: 800, 
                eloPlayer2: 800,
            })   
        })
}

// { Pseudo: 'covowel03' }, { Email: 'marty.evuort@efrei.net' },
// { Pseudo: 'Serquand' }, { Email: 'esteban.goat@efrei.net' },
// { Pseudo: 'Esteban' }, { Email: 'esteban.vincent@efrei.net' },