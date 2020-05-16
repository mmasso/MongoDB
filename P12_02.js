/*We want to create a MongoDB database for a blog. If we think in the same way that we did using relational model, a blog may have 3 entities:
User. Fields:
_id
name
dateOfBirth
email
Post. Fields:
_id
title
text
Tags ([ ])
Comment. Fields:
_id
text
author
A user may create posts (a post belongs to a single user). Users may also comment posts (a comment belongs to a single post).
If we think in the same way that we did using relational model, this database will have 3 tables. But with MongoDB it’s a good idea to insert comments inside their post (because comments belong to a single post). The reason is that, usually, when you get a post you want its comments also… With MongoDB you think nearer to the implementation. You’ll understand this next year :)
So, create using MongoDB a database “blog” with two collections “user” and “post”. Remember that the comments are a field inside a “post” document…
Finally, join all the information of the users joined with their posts.
Source: Academind.*/

use blog;

db.users.insertMany([{
        _id: "AUTHOR01",
        name: "Juancho Villa",
        dateOfBirth: "08/01/1999",
        email: "juancho.villa.elmatador@gmail.com"
    },
    {
        _id: "AUTHOR02",
        name: "Paquito Tomas",
        dateOfBirth: "25/11/2006",
        email: "tomastopaco@hotmail.es"
    },
    {
        _id: "AUTHOR03",
        name: "Paquito Tomas Tercero",
        dateOfBirth: "26/11/2006",
        email: "naci2horasdespues@hotmail.es"
    }
]);

db.post.insertMany([{
        _id: "POST01",
        _author_id: "AUTHOR03",
        authorPost: "Paquito Tomas Tercero",
        title: "Tengo hambre!",
        text: "No se si comprarme una hamburgesa o un pepito, que opinan?",
        tags: ["hambre", "comida"],
        comments: [{
                _author_id: "AUTHOR02",
                authorCommentary: "Paquito Tomas",
                text: "No puedes comer algo de verduras? Gordo!"
            },
            {
                _author_id: "AUTHOR01",
                authorCommentary: "Juancho Villa",
                text: "Voto por el pepito!"
            }
        ]
    },
    {
        _id: "POST02",
        _author_id: "AUTHOR02",
        authorPost: "Paquito Tomas",
        title: "No quiero pagarle la cena a mi hermano, menos si es carne!",
        text: "No se si comprarme una hamburgesa o un pepito, que opinan?",
        tags: ["tacaño", "disputas", "comida"],
        comments: [{
                _author_id: "AUTHOR03",
                authorCommentary: "Paquito Tomas Tercero",
                text: "Y hace falta discutir esto por aqui?"
            },
            {
                _author_id: "AUTHOR01",
                authorCommentary: "Juancho Villa",
                text: "Echadlo a suertes ;)"
            }
        ]
    }
]);

//Sin problemas de sintaxis

db.post.aggregate(
    [{
        $lookup: {
            from: "users",
            localField: "comments._author_id",
            foreignField: "_id",
            as: "AuthorInfo"
        }
    }]
).pretty()