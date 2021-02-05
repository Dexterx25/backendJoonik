# backendJoonik
!warning! 
Hola amigo, ya está. Puede verificar las endpoint pero colocando http://localhost:3000/
ahora, para correr el servicion haces primero npm install para instalar las dependencias y luego haces npm run main y asi se activará el backend de forma desarrollo. Si deseas tambien puedes instalar pm2 que es para produccion y haces pm2 start api/index y listo! PD: ten en cuenta montar a base de datos de postman el archivo sql pero verificas primero que hayas seguido correctamente la instalacion del sql teniendo en cuenta el archivo config.js 
Aqui está el postman para que pruebes facilmente: 

!POR FAVOR MIRA LAS INSTRUCCIONES! 
esta abajo para tu comodidad un link a testear las endpoint facilmente en postman! jeje *Me avisas se faltò algo y lo colocaré de inmediato* jejeje Buen dia
este es mi whatsaap 3023108531

!warning!´



This backend is necesary to upload in a virtual machine because this backend app use a postgres and redis services. Plese, check out the config.js to configured
--->Postgres v 13
for install the postgres v13 go to --> https://computingforgeeks.com/how-to-install-postgresql-13-on-ubuntu/
One time you instaled
1)Create one user postgres called = joonik
2)configure the joonik password user = sadsvvex
3)host = localhost
4) create database = joonik_d

//node version 12.20.0

//steps for create database:
type this commands:
1) sudo su postgres
2) psql 
CREATE USER joonik WITH PASSWORD 'sadsvvex';

CREATE DATABASE joonik_db OWNER joonik

GRANT ALL PRIVILEGES ON DATABASE joonik_db TO joonik

\q 

psql joonik_db joonik

pass---> sadsvvex

allready!!

now go to the file db.sql into this repository. Copy an Paste! 

now if you configured all postgres services, you can use this backend app without problems. 

PD: if you need problems call me and i help you! 
xd
HERE IS THE POSTMAN URL FOR YOU CAN TESTING THIS APP -----> https://www.getpostman.com/collections/11c149c7f95f17b388e6
