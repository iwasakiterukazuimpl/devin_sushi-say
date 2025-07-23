const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/say', (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: '入力が必要です' });
  }

  res.json({ text });
});

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
