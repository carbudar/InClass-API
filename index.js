import express from 'express'
import fs from 'fs/promises'

const app = express();

const port = process.env.PORT || 3001

let jsonData;

const readJson = async () =>{
    const data = await fs.readFile('data.json', 'utf-8');
    jsonData = JSON.parse(data)
}

readJson().then(() =>{
    app.listen(port, ()=>{
        console.log(`App listening on port ${port}`)
    })
})

app.get('/roster', (req,res) =>{
    res.send(jsonData)
})

app.get('/age', (req,res) =>{
    const reqAge = req.query.max;
    const roster = jsonData.roster;

    let selectedPlayers = [];

    roster.forEach((player) =>{
        if(player.age <= reqAge){
            selectedPlayers.push(player.last_name)
            console.log(player.last_name)
        }

    })

    res.send(selectedPlayers)
})

app.get('/yearsActive', (req,res) => {
    const minYearsActive = req.query.min;
    const roster = jsonData.roster;

    let selectedPlayers = [];
    roster.forEach((player) =>{
        if(player.years_active >= minYearsActive){
            selectedPlayers.push(player.last_name)

        }
    })
    res.send(selectedPlayers)

})

app.get('/player/:player', (req,res) =>{
    const reqPlayer = req.params.player.substring(1);
    const roster = jsonData.roster

    roster.forEach((player,index)=>{
        if(player.last_name == reqPlayer){
            const reqPlayerData = roster[index];
            res.send(reqPlayerData)
        }
    })
   
})