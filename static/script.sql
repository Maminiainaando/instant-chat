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

create table users(
    id_user serial primary key,
    username varchar(255),
    email varchar(255),
    password varchar(255)
);
 
create table messages(
    id_message serial primary key,
    messages varchar(255),
    id_user int references users(id_user),
    sending_date timestamp not null,
    date_created timestamp
);
