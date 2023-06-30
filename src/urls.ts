import {PageLink} from './index';


export const HOME_URL : PageLink = '/';
export const API: PageLink = '/api';

//Loading and Saving Wizard data
export const GET_WIZARD_SETUP_STARTED: PageLink = `${API}/wizard/start/:Id`;
export const POST_WIZARD_STEP_ACTIONER : PageLink = `${API}/wizard/:Id/:steps`;

export const GET_DEFAULT_ROUTES : PageLink = '*';