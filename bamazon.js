const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "root",
    database: "bamazon_DB"
})

connection.connect(function(err) {
    if (err) throw err;
})

function getCommand() {
    inquirer.prompt([
    {
        name: "command",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "All songs by artist",
            "All artists that appear 2+ times in the Top 5000",
            "Display songs by range",
            "Display songs by song name",
            "Exit"
        ]        
    }                            
    ]).then(function(answers) {
        switch (answers.command) {
            case "All songs by artist":
                artistSearch();
                break;
            case "All artists that appear 2+ times in the Top 5000":
                multiSearch();
                break;
            case "Display songs by range":
                displayRange();
                break;
            case "Display songs by song name":
                songSearch();
                break;   
            case "Exit":
                connection.end();
                break;                                                                         
        }                
    })        
}
getCommand();

function multiSearch() {
    // for "All artists that appear 2+ times in the Top 5000"
    var param = "SELECT artist FROM Top5000 GROUP BY artist HAVING COUNT(*) > 1";    
    connection.query(param, function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            console.log(res[i].artist);
        }
        getCommand(); 
    })               
}
    
function displayRange () { // for "Display songs by range"
    inquirer.prompt([
        {
            message: "Enter lower bound (1-5000)",
            name: "lowerBound"                                        
        },
        {
            message: "Enter upper bound (1-5000)",
            name: "upperBound"    
        }
     ]).then(function(answer) {
        connection.query("SELECT * FROM Top5000 where position BETWEEN ? AND ?", [answer.lowerBound, answer.upperBound], function(err, res) {
            if (err) throw err;
            for (i=0; i<res.length; i++) {
                console.log(`\nPosition: ${res[i].position} | Artist: ${res[i].artist} | Song: ${res[i].song} | Year: ${res[i].year} | Total Score: ${res[i].raw_total} | USA: ${res[i].raw_usa} | UK: ${res[i].raw_uk} | EUR: ${res[i].raw_eur} | Rest of World: ${res[i].raw_row}`);
            }
            getCommand(); 
        })    
     })            
}

function songSearch() { // "Display songs by song name"
    inquirer.prompt([
        {
            message: "What song would you like to search for?",
            name: "song"
        }
     ]).then(function(answer) {
        let song = answer.song;
        connection.query("SELECT * FROM top5000 WHERE song=?", song, function(err, res) {
            if (err) throw err;
            for (i=0; i<res.length; i++) {
                console.log(`\nPosition: ${res[i].position} | Artist: ${res[i].artist} | Song: ${res[i].song} | Year: ${res[i].year} | Total Score: ${res[i].raw_total} | USA: ${res[i].raw_usa} | UK: ${res[i].raw_uk} | EUR: ${res[i].raw_eur} | Rest of World: ${res[i].raw_row}`);
            }            
            getCommand();
        })
     })
}
    

function artistSearch() { //"Display all songs by a specific artist."
 inquirer.prompt([
    {
        message: "Which artist would you like to search for?",
        name: "artist"
    }
 ]).then(function(answer) {
    let artist = answer.artist;
    connection.query("SELECT * FROM top5000 WHERE artist=?", artist, function(err, res) {
        if (err) throw err;
        for (i=0; i<res.length; i++) {
            console.log(`\nPosition: ${res[i].position} | Artist: ${res[i].artist} | Song: ${res[i].song} | Year: ${res[i].year} | Total Score: ${res[i].raw_total} | USA: ${res[i].raw_usa} | UK: ${res[i].raw_uk} | EUR: ${res[i].raw_eur} | Rest of World: ${res[i].raw_row}`);
        }        
        getCommand();
    })
 })
}