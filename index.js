const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const JWTSecret = "fjsdklfjsdlkfjsdlkfjsdlkfjsdlkçfjsdlfkj";

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

function auth(req, res, next) {
  const authToken = req.headers['authorization'];

  if (authToken != undefined) {

    const bearer = authToken.split(' ');
    let token = bearer[1];

    jwt.verify(token, JWTSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido!" });
      } else {

        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };

        next();
      }
    });

  } else {
    res.status(401);
    res.json({ err: "Token inválido!" });
  }
}

let DB = {
  games: [
    {
      id: 23,
      title: "Call of Duty MW",
      year: 2019,
      price: 60
    },
    {
      id: 65,
      title: "Sea of thieves",
      year: 2018,
      price: 40
    },
    {
      id: 2,
      title: "Minecraft",
      year: 2009,
      price: 20
    },
  ],
  users: [
    {
      id: 1,
      name: "Felipe Henrique",
      email: "felipe@teste.com",
      password: "nodejs<3"
    },
    {
      id: 20,
      name: "Rafael Henrique",
      email: "rafael@teste.com",
      password: "javajs<3"
    },
  ]
}

app.get("/games", auth, (req, res) => {
  res.statusCode = 200;
  res.json(DB.games);
});

app.get("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {

    let id = parseInt(req.params.id);

    let game = DB.games.find(g => g.id == id);

    if (game != undefined) {
      res.statusCode = 200;
      res.json(game);
    } else {
      res.sendStatus(404);
    }

  }
});

app.post("/game", auth, (req, res) => {
  let { title, price, year } = req.body;

  DB.games.push({
    id: 2323,
    title,
    price,
    year
  });

  res.sendStatus(200);
});

app.delete("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    let index = DB.games.findIndex(g => g.id == id);

    if (index == -1) {
      res.sendStatus(404);
    } else {
      DB.games.splice(index, 1);
      res.sendStatus(200);
    }
  }
});

app.put("/game/:id", auth, (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {

    let id = parseInt(req.params.id);

    let game = DB.games.find(g => g.id == id);

    if (game != undefined) {

      let { title, price, year } = req.body;

      if (title != undefined) {
        game.title = title;
      }

      if (price != undefined) {
        game.price = price;
      }

      if (year != undefined) {
        game.year = year;
      }

      res.sendStatus(200);

    } else {
      res.sendStatus(404);
    }

  }
});

app.post("/auth", (req, res) => {
  let { email, password } = req.body;

  if (email != undefined) {

    let user = DB.users.find(u => u.email == email);

    if (user != undefined) {

      if (user.password == password) {

        jwt.sign({ id: user.id, email: user.email }, JWTSecret, { expiresIn: '1h' }, (err, token) => {
          if (err) {
            res.status(400);
            res.json({ err: "Falha interna" });
          } else {
            res.status(200);
            res.json({ token: token });
          }
        });

      } else {
        res.status(401);
        res.json({ err: "Credenciais inválidas" });
      }

    } else {
      res.status(404);
      res.json({ err: "O E-mail enviado não existe na base de dados" });
    }

  } else {
    res.status(400);
    res.json({ err: "O E-mail enviado é invalido" });
  }
});

app.listen(3333, () => {
  console.log("API RODANDO");
});