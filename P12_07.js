//1.- Download this file (read the license here) and import it to MongoDB.

// mongoimport C:\Users\mateu\Desktop\persons.json -d personsDB -c persons --jsonArray --drop

//2.- Total number of persons per age. Sort the results from older to younger.

use personsDB

db.persons.aggregate([
    { $group: { "_id": { "Age": "$dob.age" }, "NumberOfPersons": { $sum: 1 } } },
    { $sort: { NumberOfPersons: -1 } }
]).pretty()

//3.- Total number of persons per gender with age between 18 and 21.
// Sort the results by amount of persons per gender desc.  

db.persons.aggregate([
    { $match: { $or: [{ gender: "female" }, { gender: "male" }], $and: [{ "dob.age": { $gte: 18 } }, { "dob.age": { $lte: 21 } }] } },
    { $group: { "_id": { "Gender": "$gender" }, "NumberOfPersons": { $sum: 1 } } },
    { $sort: { NumberOfPersons: -1 } }
]).pretty()


//4.- Show the minimum and maximum age per gender.

db.persons.aggregate([
    { $match: { $or: [{ gender: "female" }, { gender: "male" }] } },
    { $group: { "_id": { "gender": "$gender" }, "MaxAge": { $max: "$dob.age" }, "MinAge": { $min: "$dob.age" } } }
]).pretty()

//5.- Total number of persons per gender but with age greater than 60 and now also show the 
//average age of the two groups. Sort the results by amount of persons per gender desc.

db.persons.aggregate([
    { $match: { $and: [{ $or: [{ gender: "female" }, { gender: "male" }] }, { "dob.age": { $gte: 60 } }] } },
    { $group: { "_id": { "gender": "$gender" }, "persPerGender": { $sum: 1 }, "AgeAverage": { $avg: "$dob.age" } } },
    { $sort: { persPerGender: -1 } }
]).pretty()