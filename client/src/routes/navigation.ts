
import * as URLS from './urls'
import MainLoader from '../main';
import {NotFound} from '../components/notfound';
import {NavigatableItems} from './index';

    /* The `const Navigations` is an array of objects that define the navigation links and their
    corresponding components. Each object in the array has two properties: */
    const Navigations: NavigatableItems = [
        {  link: URLS.HOME,
        component: MainLoader,
        },
    {  link: '*',
        component: NotFound ,
    }, 

    ];

export {Navigations};