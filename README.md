# backendJoonik
!warning! 

Hola, testeador. 
Los puntos requeridos entan en los endpoints de registro de usuario, login y bueno... lo que entendi en los otros dos puntos es que trayera datos de usuario en este caso le coloquè un microservicio "cards" para registrar tarjetas de creditos con seguridad en tokens jejej y que pueda ver el array de tarjetas y poder captar una viendo sus datos por id de tarjeta acoplando token de seguridad. Le quise poner mas cosas pero bueno me estaba creando una mini aplicacion pero mejor para entregar rapido lo dejé en proceso de aplicacion 

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
