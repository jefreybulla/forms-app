import express from 'express';
import * as path from 'path';

import {JsonDB, Config} from 'node-json-db'

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.json());

const db = new JsonDB(new Config("db", true, true, '/'));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to forms-api!' });
});

const currentTime = new Date()
app.get("/api/health", (req, res) => {
  res.status(200).json(currentTime);
})

app.get("/api/questions/:id", async (req, res) => {
  const {id} = req.params;
  const question = await db.getData(`/questions[${parseInt(id)}]`);
  res.status(200).json(question);
})


app.get("/api/responses/:id", async (req, res) => {
  const {id} = req.params;
  const response = await db.getData(`/responses[${parseInt(id)}]`);
  res.status(200).json(response);
})

try {
  app.post("/api/responses", async (req, res) => {
    console.log('adding a form response...')
    const question_id = await req?.body?.question_id;
    const unique_response = await req?.body?.unique_response?? "";
    const multiple_response = await req?.body?.multiple_response ?? [];
    const responses = await db.getData("/responses");
    const id = responses.length ?? 0;
    await db.push(`/responses[${id}]`, {question_id, unique_response, multiple_response});
    res.status(201).json("Response created in db");
  })
}
catch (error) {
  console.log(error)
  console.log(error.inner)
}

try {
  app.get("/api/responses", async (req, res) => {
    console.log('getting responsess from db...')
    const responses = await db.getData("/responses");
    res.status(200).json(responses);
  })
}
catch (error) {
  console.log(error)
  console.log(error.inner)
}


const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
