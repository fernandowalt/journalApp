import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "../routes/PrivateRoutes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [isLoggedIn, setisLoggedIn] = useState(false);
  const [checking, setChecking] = useState(true);
  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setisLoggedIn(true);
      } else {
        setisLoggedIn(false);
      }
      setChecking(false);
    });
  }, [setChecking]);

  if (checking) {
    return <h1>Espera...</h1>;
  }

  return (
    <BrowserRouter>
      <div>
        <Switch>
          <PublicRoute
            isAuthenticated={isLoggedIn}
            path="/auth"
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            isAuthenticated={isLoggedIn}
            path="/"
            component={JournalScreen}
          />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
