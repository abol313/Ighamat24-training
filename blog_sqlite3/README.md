# In the name of kindly generous ALLAH
# Thanks ALLAH

## Blog
### Project
You can show and list post
You (as admin) can to show, list, delete, edit posts

## How to serve this bit framework 
You can go to the root dir
```shell
cd blog_sqlite3
```

Now you can serve
```shell
php -S 127.0.0.1:3000 -t public
```

## How to run database
You can migrate and seed your database
### Migration
run [this file](./database/migrate.php) via php, to migrate [migrations](./database/migrations/)
```shell
php database/migrate.php
```
### Seeding
run [this file](./database/seed.php) via php, to seed [seeders](./database/seeders/)
```shell
php database/seed.php
```

## Database (d.b.m.s.)
### Sqlite
Sqlite used to this app

## Awesome Features
### Bit Framework
Made in interests, this framework functionality or logically, tried to be same to Laravel framework...
Libraries made in iterests, and own logical not copied, but tried to be similarly to Laravel structure and syntaxes and ... to use more comfortable

## php
The main language used in this project is php

## php - Sqlite
The pdo interface used to connect to sqlite in [resource file db](./database/blog.db)
### Sqlit - pdo - driver
The pdo driver of Sqlite must be installed in php
You can in linux, use
```shell
sudo apt install php8.1-sqlite3 #php 8.1 choose another related version
```

## Style
There is not good styles, yet!
