
import * as URLS from './urls'
import {MainLoader} from '../main';
import {NotFound} from '../components/notfound';
import {NavigatableItems} from './index';

const Navigations: NavigatableItems = [
    {  link: URLS.HOME,
       component: MainLoader,
    },
   {  link: '*',
      component: NotFound ,
   }, 

];





export {Navigations};