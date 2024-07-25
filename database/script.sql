-- potgress
\conninfo
 CREATE ROLE chat WITH LOGIN PASSWORD '1234';
ALTER ROLE chat CREATEDB;
 \du
 \q

 --terminal
psql -d postgres -U chat
create database chat_app;
\c chat_app;

CREATE TABLE users (
    id_user SERIAL PRIMARY KEY,
    username VARCHAR(255),
    email VARCHAR(255),
    gender varchar(255),
    status_user VARCHAR(255) default "offline"
    password VARCHAR(255),
    image_user BYTEA
);

create table messages(
    id_message serial primary key,
    messages varchar(255),
    id_user int references users(id_user),
    sending_date timestamp not null,
    type_message varchar(255)
);
