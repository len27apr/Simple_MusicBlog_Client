import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
// import Login from "./pages/login/Login";
// import Register from "./pages/register/Register";
// import Settings from "./pages/settings/Settings";
// import Single from "./pages/single/Single";
// import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Context } from "./context/Context";
import React, {useContext, Suspense} from 'react';


const LoginPage = React.lazy(() => import("./pages/login/Login"));
const RegisterPage = React.lazy(() => import("./pages/register/Register"));
const SettingsPage = React.lazy(() => import("./pages/settings/Settings"));
const SinglePage = React.lazy(() => import("./pages/single/Single"));
const WritePage = React.lazy(() => import("./pages/write/Write"))


function App() {
  const { user } = useContext(Context);
  console.log('the user is: ', user);
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          <Suspense fallback={<p>Loading...</p>} >
            {user ? <Homepage /> :<RegisterPage />}
          </Suspense>
        </Route>
        <Route path="/login">
          <Suspense fallback={<p>Loading...</p>}>
            {user ? <Homepage /> : <LoginPage />}
          </Suspense>
        </Route>
        <Route path="/post/:id">
          <Suspense fallback={<p>Loading..</p>}>
          <SinglePage />
          </Suspense>
        </Route>
        <Route path="/write">
          <Suspense fallback={<p>Loading..</p>}>
            {user ? <WritePage /> : <LoginPage />}
          </Suspense>
        </Route>
        <Route path="/settings">
          <Suspense fallback={<p>Loading..</p>}>
            {user ? <SettingsPage />: <LoginPage />}
          </Suspense>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
