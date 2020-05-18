/*1.- Create a database and a collection inside to keep data about the high schools in the Balearic island. The documents must have the following fields:
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






//3.- Using insertMany, insert some documents but deliberately insert the same "_id" that the one in exercise 2 to get an error. Use unordered inserts not to stop the insertions despite that error.