import express from 'express';
import cors from 'cors';
import { connectMongo } from './db.js';
import itemsRouter from './routes/items.js';

const app = express();
const PORT = process.env.PORT || 5380;

app.use(cors());
app.use(express.json());

connectMongo()
  .then(() => {
    app.use('/items', itemsRouter);
    import('./routes/users.js').then(({ default: usersRouter }) => {
      app.use('/users', usersRouter);
      app.listen(PORT, () => {
        console.log(`Backend server running on http://localhost:${PORT}`);
      });
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  });
