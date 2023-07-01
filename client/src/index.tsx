import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {Navigations} from './routes/navigation';
import {STORE} from './redux/store';
import {Provider} from 'react-redux'
import { BrowserRouter as Router, Route, Routes }
    from "react-router-dom";


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



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={STORE}>
    {Routable.getInstance().NavigationRouter()}
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
