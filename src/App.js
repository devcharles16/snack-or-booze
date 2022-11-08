import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState({});
//set
  useEffect(() => {
    async function getItems() {
      let items = await SnackOrBoozeApi.getItems();
      setItems(items);
      setIsLoading(false);
    }
    getItems();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/snacks">
              <Menu items={items.snacks} title="Snacks" />
            </Route>
            <Route exact path="/drinks">
            <Menu items={items.drinks} title="Drinks" />
            </Route>
            <Route path="/snacks/:id">
              <MenuItem items={items.snacks} cantFind="/snacks" />
            </Route>
            <Route path="/drinks/:id">
              <MenuItem items={items.drinks} cantFind="/drinks" />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
