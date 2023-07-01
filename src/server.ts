import express from 'express';
import * as path from 'path';
import cors from 'cors';
import config from 'config';
import {ProtectedRoutedNavigationSetup} from './protectedNavigation';
import {Navigation} from './navigation';
import {OIDCAuthServiceClient} from './middleware/oidc';
import {DefaultNavigation} from './defaultNavigation';



const app = express();
app.use(express.json());
app.use(cors());


new Navigation().enableFor(app);
new OIDCAuthServiceClient().enableFor(app);
new ProtectedRoutedNavigationSetup().enableFor(app);
new DefaultNavigation().enableFor(app);


app.listen(config.get('PORT'), ()=> console.log({msg: 'server is running on port 5000'}))



