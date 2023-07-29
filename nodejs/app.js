const express = require('express');
const { Client } = require('@elastic/elasticsearch');
const app = express();
const port = 3000;

const client = new Client({ node: 'http://elasticsearch:9200' });

app.get('/', async (req, res) => {
  let r = (Math.random() + 1).toString(36).substring(7)
  const { body } = await client.index({
    index: 'log',
    body: {
      message: r,
      timestamp: new Date(),
    },
  });

  res.send(r);
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
