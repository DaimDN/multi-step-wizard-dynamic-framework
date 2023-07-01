import {PageLink} from './index';


export const API: PageLink = '/api';


export const GET_SERVER_CHECK: PageLink = '/api/welcome';

//Loading and Saving Wizard data
export const POST_WIZARD_CREATOR: PageLink = `${API}/wizard/create`;
export const GET_WIZARD: PageLink = `${API}/wizard/:Id`;
export const GET_ALL_WIZARD: PageLink = `${API}/wizard/all`;
export const GET_WIZARD_SETUP_STARTED: PageLink = `${API}/wizard/start/:Id`;
export const PUT_UPDATE_WIZARD_DATA : PageLink = `${API}/wizard/:Id`;
export const GET_DELETE_WIZARD : PageLink = `${API}/wizard/delete/:Id`;

export const GET_AUTH_TOKEN : PageLink = `${API}/token`;

export const GET_DEFAULT_ROUTES : PageLink = '*';