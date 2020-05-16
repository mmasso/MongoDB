Considering an example of customer schema like this: {
    "name": "Bob",
    "surname": "Harris",
    "age": 47,
    "hobbies": [
        { "name": "tennis", "frequency": "1 time per week" },
        { "name": "jogging", "frequency": "3 times per week" }
    ]
}

1. Create a database“ gym” and inside that database a collection named“ customers”.Finally, insert the document above inside the collection.

use gym;
db.createCollection(customers);
db.customers.insertone({
    "name": "Bob",
    "surname": "Harris",
    "age": 47,
    "hobbies": [
        { "name": "tennis", "frequency": "1 time per week" },
        { "name": "jogging", "frequency": "3 times per week" }
    ]
});


2. Insert 3 customer records with at least 1 hobby entry per customer.

db.customers.insertmany({
    [{
            "name": "Calvo",
            "surname": "Jones",
            "age": 35,
            "hobbies": [
                { "name": "tennis", "frequency": "1 time per week" }
            ]
        },
        {
            "name": "David",
            "surname": "Martinez",
            "age": 81,
            "hobbies": [
                { "name": "jogging", "frequency": "2 time per week" }
            ]
        },
        {
            "name": "Maria",
            "surname": "Flores",
            "age": 19,
            "hobbies": [
                { "name": "swimming", "frequency": "3 time per week" }
            ]
        }
    ]
});

3. Update the age of Bob Harris to 48.

db.customers.updateOne({
    "name": "Bob",
    "surname": "Harris"
}, {
    $set: {
        "age": 48
    }
});

Supongo que con un findOneAndUpdate() funcionaria ? Veo muchos metodos parecidos, pero no acabo de entender sus diferencias.

4. Find all customers who are older than 18.

db.customers.find({ "age": { $gt: 18 } });

5. Delete all customers who have tennis as a hobby.

db.customers.deleteMany({
    "hobbies.name": "tennis"
});

He estado leyendo lo de las collation, y supongo que usandolo, para que te mirara tambien mayusculas y minusculas seria:


    db.customers.deleteMany({
        "hobbies.name": "tennis"
    }, {
        collation: { locale: "en", strength: 1 }
    });

Source: Academind.