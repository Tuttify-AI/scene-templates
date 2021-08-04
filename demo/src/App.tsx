import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import { Template, TemplateList } from './components';
import routes from './routes';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TemplateList} />

        {routes.map((route, index) => (
          <Route exact path={route.path} key={index}>
            <Template>
              <route.component />
            </Template>
          </Route>
        ))}

        <Redirect path="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
