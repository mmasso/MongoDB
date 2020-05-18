//1.- Import this json file (read the license here) data into a new database (name: "tvshows") 
//and collection (e.g. shows).

// mongoimport C:\Users\mateu\Desktop\shows.json -d tvshows -c shows --jsonArray --drop

//2.- Search all movies that have a rating lower than 4 and a runtime lower than 45 minutes.

use tvshows

db.shows.find({
    $and: [
        { "rating.average": { $lt: 4.0 } },
        { "runtime": { $lt: 45 } }
    ]
}).pretty()

//3.- Show the top 10 shows. Show name and rating.

db.shows.find({}, { "name": 1, "rating": 1, "_id": 0 }).sort({
    "rating.average": -1
}).limit(10).pretty()

//4.- Shot the top 10 worst shows. Show name and rating.

db.shows.find({ "rating.average": { $ne: null } }, { "name": 1, "rating": 1, "_id": 0 }).sort({
    "rating.average": 1
}).limit(10).pretty()

//5.- Search all movies that have a genre of “Science-Fiction” and “Horror” (both).

db.shows.find({
    $and: [
        { "genres": "Science-Fiction" },
        { "genres": "Horror" }
    ]
}).pretty()

//6.- Search all movies that have a genre of “Science-Fiction” or “Horror” (at least one).

db.shows.find({
    $or: [
        { "genres": "Science-Fiction" },
        { "genres": "Horror" }
    ]
}).pretty()

//7.- Search all movies where field “runtime” exceeded field “weight”.

db.shows.find({
    $expr: {
        $gt: ["$runtime", "$weight"]
    }
}).pretty()

//8.- Shows not in English.

db.shows.find({ "language": { $not: { $regex: "English" } } }, { "_id": 0, "name": 1, "language": 1 }).pretty()