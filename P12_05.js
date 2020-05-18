//1.- Import this json file (read the license here) data into a new database (name: "tvshows")
// and collection (e.g. shows).

// mongoimport C:\Users\mateu\Desktop\shows.json -d tvshows -c shows --jsonArray --drop

//2.- Find all movies with exactly four genres.

use tvshows

db.shows.find({ "genres": { $size: 4 } }).pretty()

//3.- Find all movies with scheduled time 20:00 and days Monday.

db.shows.find({
    $and: [{ "schedule.time": "20:00" }, { "schedule.days": "Monday" }]
}).pretty()

//4.- Find all movies with genres “Drama”, “Action”, and “Thriller” (only those ones and in any order).
// Use $all.

db.shows.find({
    $and: [
        { "genres": { $all: ["Drama", "Action", "Thriller"] } },
        { "genres": { $size: 3 } }
    ]
}).pretty()


//5.- Find all movies with genres “Drama”, “Action”, and “Thriller” 
//(only those ones and in just the same order).

db.shows.find({ genres: ["Drama", "Action", "Thriller"] }).pretty()



//6.- Shows premiered in 2011. You must search on the internet to do this exercise...

db.shows.find({ "premiered": { $gte: "2011-01-01", $lte: "2011-12-31" } }).pretty()

//crec que aquesta base de dades no guarda les dates com a dates/ISODates,
// he provat a inclourerles com a ISODates("2011-01-01") etc i no funcionava.