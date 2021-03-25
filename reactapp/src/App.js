import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";

import { registerLocale, setDefaultLocale } from "react-datepicker";
import { fr } from "date-fns/locale";

import shopDetails from "./reducers/OfferDetails.reducer";
import search from "./reducers/Search.reducer";
import details from "./reducers/ChosenAppointment.reducer";
import shopsData from "./reducers/shopsData.reducer";
import token from "./reducers/token.reducer";

import HomeScreen from "./components/HomeScreen/HomeScreen";
import ListScreen from "./components/ListScreen/ListScreen";
import ShopScreen from "./components/ShopScreen/ShopScreen";
import SignScreen from "./components/SignScreen/SignScreen";
import AppointmentScreen from "./components/AppointmentScreen/AppointmentScreen";
import ProfileScreen from "./components/ProfileScreen/ProfileScreen";
import FavoriteScreen from "./components/FavoriteScreen";
import Header from "./components/Header";

const store = createStore(
  combineReducers({
    shopDetails,
    search,
    details,
    shopsData,
    token,
  })
);

registerLocale("fr", fr);
setDefaultLocale("fr");

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <HomeScreen />
          </Route>
          <Route exact path="/ListScreen">
            <ListScreen />
          </Route>
          <Route exact path="/ShopScreen">
            <ShopScreen />
          </Route>
          <Route exact path="/SignScreen">
            <SignScreen />
          </Route>
          <Route exact path="/AppointmentScreen">
            <AppointmentScreen />
          </Route>
          <Route exact path="/ProfileScreen">
            <ProfileScreen />
          </Route>
          <Route exact path="/FavoriteScreen">
            <FavoriteScreen />
          </Route>
          <Route exact path="/Header">
            <Header />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
