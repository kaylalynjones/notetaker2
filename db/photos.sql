create table photos(
  id serial primary key,
  url varchar(500) not null,
  created_at timestamp not null default now()
);
