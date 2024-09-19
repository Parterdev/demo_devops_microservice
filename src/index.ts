import express from 'express';
import { routes } from './routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

export default app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Microservice running on port: ${port}`);
  });
}