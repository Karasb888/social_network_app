import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';

// initialize configuration
dotenv.config({ path: path.resolve(__dirname, '../config/.env') });

const PORT = process.env.PORT || 5000;
const BUILD_ENV = process.env.NODE_ENV || 'production';
const { MONGO_DB_URI } = process.env;

const app = express();

if (BUILD_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'front', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'front', 'dist', 'index.html'));
  });
}

async function start(): Promise<void> {
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`Server error ${err}`);
    process.exit(1);
  }
}

start();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:${PORT}`);
});
