# piko-server-nestjs

Application for creating surveys in the form of contests.

You can access it here http://31.129.106.57:3001/

Also You can see the client implementation here https://github.com/mnsavag/piko-client-react/

## Main stack

- Node.js
- Nest.js
- Typescript
- PostgreSQL
- TypeORM
​
## Swagger API

### URL Address

```bash
/api/docs
```
### Preview

![alt text](https://github.com/mnsavag/piko-server-nestjs/blob/master/api-preview.png?raw=true)

## Database view

![alt text](https://github.com/mnsavag/piko-server-nestjs/blob/master/piko-db.png?raw=true)

## Installation

### Set environment variables

Create or change an .development.env file on root folder. Feel free to change it according to your own configuration.

### Install dependencies

```bash
npm install
```

### Set up database

Use PostgreSQL

```bash
npm run makemigrations
```

```bash
npm run migrate
```

 Database initialization
 
```bash
INSERT INTO category(name)
VALUES ('music');
INSERT INTO category(name)
VALUES ('cinema');
INSERT INTO category(name)
VALUES ('sport');
INSERT INTO category(name)
VALUES ('technology');
INSERT INTO category(name)
VALUES ('fashion');
INSERT INTO category(name)
VALUES ('nature');
INSERT INTO category(name)
VALUES ('games');
INSERT INTO category(name)
VALUES ('other');
```

### Running the app

```bash
npm run start:dev
```
