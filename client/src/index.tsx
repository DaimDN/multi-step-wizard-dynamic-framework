import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Navigations} from './routes/navigation';
import {STORE} from './redux/store';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Routes }
    from "react-router-dom";


  /* The `Routable` class is a singleton class that provides a single instance of itself. It has a
  private static property `RoutableInstance` which holds the single instance of the class. The
  constructor is private, so it cannot be called from outside the class. */
  class Routable{
    private static RoutableInstance: Routable;
    private constructor() { }
    public static getInstance(): Routable {
        if (!Routable.RoutableInstance) {
            Routable.RoutableInstance = new Routable();
        }
        return Routable.RoutableInstance;
    }
    public NavigationRouter = () => 
    (<Router>
    <Routes>
    {Navigations.map(nav => <Route   path={nav.link as string} element={<nav.component/>} /> )}
    </Routes>
    </Router>);

  }

  /* The `const rootElementSelector = ReactDOM.createRoot(document.getElementById('root') as
  HTMLElement);` line of code is creating a root element selector using the `ReactDOM.createRoot()`
  function. */
  const rootElementSelector = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );
  /* The `rootElementSelector.render()` function is rendering the root component of the React
  application. */
  rootElementSelector.render(
    <React.StrictMode>
      <Provider store={STORE}>
      {Routable.getInstance().NavigationRouter()}
      </Provider>
    </React.StrictMode>
  );

reportWebVitals();
