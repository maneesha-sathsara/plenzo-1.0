// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API එක වැඩද බලන්න Health Check Route එකක්
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', store: 'Plenzo E-Commerce API Active' });
});

app.listen(PORT, () => {
  console.log(`Plenzo Backend server running on port ${PORT}`);
});