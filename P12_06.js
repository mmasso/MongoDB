//1.- Explain upsert with –at least three– the example. You must use operators like $inc and $mul.

/*
Upsert es un parametro opcional del metodo Update, que nos crea un nuevo documento 
si este no se encuentra ya en la base de datos. Especificamos el Upsert de la siguiente manera:

db.<collection>.update(
   {<query>},
   {<update>},
   {upsert: <boolean>})
*/

//En el siguiente ejemplo veremos como en una base de datos dada llamada prueba2, haremos un update con
// el upsert activado.

use prueba2

db.upsert.update({ "name": "Juancho Villa" }, {
    "name": "Pedro Villa",
    "age": 23
}, { upsert: true })

/*Nos devolvera el siguiente resultado: 

WriteResult({"nMatched" : 0,"nUpserted" : 1,"nModified" : 0,"_id" : ObjectId("5ec2f7f3a6fac661a3fb5151")
Donde nos especificara que es lo que ha hecho el comando.
1- No ha encontrado ningun documento que coincida con el que le hemos pedido (Juancho Villa) nMatched
2- Ha insertado (Upsert) 1 documento que nUpserted
3- No ha modificado ningún documento ya que este previamente no existia. nModified
Si ejecutamos el siguiente comando veremos el resultado de nuestro upsert:

*/

db.upsert.find().pretty()

{
    "_id": ObjectId("5ec2f7f3a6fac661a3fb5151"),
    "name": "Pedro Villa",
    "age": 23
}

//Vemos que hemos insertado un documento con los valores del update.
//Si hacemos un update con un upsert del documento dado, ocurrira lo siguiente:

db.upsert.update({ "name": "Pedro Villa" }, {
    $inc: { "age": 3 }
}, { upsert: true })

// Y vemos lo que nos devuelve: 
// WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 }) 
// Vemos que como ha encontrado un documento con los parámetros solicitados nMatched
// ha llevado a cabo las modificaciones pedidas, incrementar la edad en 3 nModified

db.upsert.find().pretty()

{
    "_id": ObjectId("5ec2f7f3a6fac661a3fb5151"),
    "name": "Pedro Villa",
    "age": 26
}

//Que pasa si no le indicamos que el upsert sea true?

db.upsert.update({ "name": "Juancho Villa" }, {
    $mul: { "age": 2 }
}, { upsert: false })

//No nos modificara, ni insertara nada
//WriteResult({ "nMatched" : 0, "nUpserted" : 0, "nModified" : 0 })
// Y para que nos funcione deberemos hacer el insert Manualmente

db.upsert.insertOne({
    "name": "Juancho Villa",
    "age": 13
})

//Y si volvemos a tirar la consulta,

db.upsert.update({ "name": "Juancho Villa" }, {
    $mul: { "age": 2 }
}, { upsert: false })

//WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })   
//Veremos que la edad se habrá multiplicado por 2

db.upsert.find({ "name": "Juancho Villa" }).pretty()

{
    "_id": ObjectId("5ec2fc0a6880e447aea32294"),
    "name": "Juancho Villa",
    "age": 26
}