import { useEffect, useState } from "react";
import { BrowserRouter, Redirect, Switch } from "react-router-dom";
import { PrivateRoute } from "../routes/PrivateRoutes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { AuthRouter } from "./AuthRouter";
import { firebase } from "../firebase/firebase-config";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { starLoginNotes } from "../actions/notes";

export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setisLoggedIn(true);

        dispatch(starLoginNotes(user.uid));
      } else {
        setisLoggedIn(false);
      }
      setChecking(false);
    });
  },[dispatch,setChecking,setisLoggedIn]);

  if (checking) {
    return <h1>Please wait...</h1>;
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
