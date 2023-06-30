import express from 'express';
import * as path from 'path';
import cors from 'cors';
import config from 'config';
import {RouterNavigationSetup} from './navigation';

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));



new RouterNavigationSetup().enableFor(app);

app.listen(config.get('PORT'), ()=> console.log({msg: 'server is running on port 5000'}))



