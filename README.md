# piko-server-nestjs

Application for creating surveys in the form of contests.

You can access it here http://31.129.106.57:3001/

Also You can see the client implementation here https://github.com/mnsavag/piko-client-react/

### Interacting with app

#### Home Page

All polls are here. You can go through them by clicking the "start" button.

Or see the rating by clicking the "show result" button.

#### Create Championship Page

Here you can create your survey. Available image formats: png/jpg/jpeg.

At the moment the editor preview does not correspond to the real preview.
​
### Database view

![alt text](https://github.com/mnsavag/markdown-files/master/piko/piko-db.png?raw=true)

### Installation

```bash
$ npm install
```

### Running the app

Set up the database in files .env, .development.env

```bash
# set up database
$ npm run migrate
```

```bash
# database initialization
$ INSERT INTO category(name)
$ VALUES ('music');
$ INSERT INTO category(name)
$ VALUES ('cinema');
$ INSERT INTO category(name)
$ VALUES ('sport');
$ INSERT INTO category(name)
$ VALUES ('technology');
$ INSERT INTO category(name)
$ VALUES ('fashion');
$ INSERT INTO category(name)
$ VALUES ('nature');
$ INSERT INTO category(name)
$ VALUES ('games');
$ INSERT INTO category(name)
$ VALUES ('other');
```

```bash
# run app
$ npm run start
```
