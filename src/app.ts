import express from 'express';
import bodyparser from 'body-parser';
import cors from 'cors';
import categories from './category/router';

const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", "true");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Authorization, Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());
app.use('/api/categories', categories);
app.listen(3000, () => console.log('server started on 3000'));
