/*1.- Create a database and a collection inside to keep data about the high schools in the Balearic island.
The documents must have the following fields:
Name.
E-mail.
Creation date.
Telephone number.
Address.
An array with documents describing the studies that you can do there. Fields:
Name.
Description.*/

use BISchools;

db.createCollection('HighSchools', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['Name', 'Email', 'CreationDate', 'TelephoneNumber', 'Adress', 'Studies'],
            properties: {
                Name: {
                    bsonType: 'string',
                    description: 'It is required to be an String!'
                },
                Email: {
                    bsonType: 'string',
                    description: 'It is required to be an String!'
                },
                CreationDate: {
                    bsonType: 'date',
                    description: 'It is required to be a date!'
                },
                TelephoneNumber: {
                    bsonType: 'string',
                    description: 'It is required to be an String!'
                },
                Adress: {
                    bsonType: 'string',
                    description: 'It is required to be an String!'
                },
                centralOffice: {
                    bsonType: 'object',
                    required: ['Name', 'Description'],
                    properties: {
                        Name: {
                            bsonType: 'string',
                            description: 'It is required to be an String!'
                        },
                        Description: {
                            bsonType: 'string',
                            description: 'It is required to be an String!'
                        }
                    }
                }
            }
        }
    }
});




//Validate the schema of the collection.
//2.- Using insertOne, insert a single document.

db.post.insertOne({
    _id: "SCH01",
    Name: "IES SINEU",
    Email: "ies.sineu@gmail.com",
    CreationDate: ISODate("1999-01-01"),
    TelephoneNumber: "921542365",
    Address: "Carrer dels aires, 23",
    Studies: {
        Name: "Informática",
        Description: "Para gente con gafas"
    }
});


//3.- Using insertMany, insert some documents but deliberately insert the same "_id" that the 
//one in exercise 2 to get an error. Use unordered inserts not to stop the insertions despite that error.

db.post.insertMany([{
        _id: "SCH02",
        Name: "IES SON MARÇAL",
        Email: "ies.son.marçal@gmail.com",
        CreationDate: ISODate("1982-01-01"),
        TelephoneNumber: "921542895",
        Address: "Carrer dels vents, 24",
        Studies: {
            Name: "Biologia",
            Description: "Para gente con pelo"
        }
    },
    {
        _id: "SCH01",
        Name: "IES SON PEDRO",
        Email: "ies.son.pedro@gmail.com",
        CreationDate: ISODate("1992-01-01"),
        TelephoneNumber: "991542895",
        Address: "Carrer de les bufades, 54",
        Studies: {
            Name: "Enginyeria",
            Description: "Para gente con oido"
        }
    },
    {
        _id: "SCH03",
        Name: "IES SON JOSEP",
        Email: "ies.son.josep@gmail.com",
        CreationDate: ISODate("1998-01-01"),
        TelephoneNumber: "921112895",
        Address: "Carrer dels tifons, 23",
        Studies: {
            Name: "Nautica",
            Description: "Para gente con pies"
        }
    }
], { ordered: false });