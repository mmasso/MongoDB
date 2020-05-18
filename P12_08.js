//Create 4 users:

//A DBA user (name "userAdmin"). Use the role "root".

use admin

db.createUser({ user: "userAdmin", pwd: "admin1" })

//Database Admin (name "userDbAdmin"): Work on all databases, create collections, create indexes, etc. 
//But it's not allowed to create users…

db.createUser({ user: "userDbAdmin", pwd: "dbadmin1", roles: ["readWriteAnyDatabase", "dbAdminAnyDatabase"] })

//User Admin (name "userAdm"): Allowed to manage users.

db.createUser({ user: "userAdm", pwd: "uadmin1", roles: ["userAdminAnyDatabase"] })

//Developer (name "userDev"): Read and write data in "customers" and "sales" databases.

db.createUser({ user: "userDev", pwd: "uDev1", roles: [{ role: "readWrite", db: "customers" }, { role: "readWrite", db: "sales" }] })

//Finally, show all the created users inside the database "admin" and "customers".

use admin
db.auth("userAdmin", "admin1")
db.getUsers()

use customers
db.getUsers()

//Globalmente

use admin
db.system.users.find().pretty()

//Obviously, you must check the built-in roles…
//Source: Academind.