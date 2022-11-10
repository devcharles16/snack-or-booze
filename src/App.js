import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import AddForm from './AddForm';



  function App() {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ snacks, setSnacks ] = useState([]);
    const [ drinks, setDrinks ] = useState([]);
  
    // get drinks and snacks on page load and set state accordingly.
    useEffect(() => {
      async function getItems() {
        let snackList = await SnackOrBoozeApi.getSnacks();
        let drinkList = await SnackOrBoozeApi.getDrinks();
        setSnacks(snackList);
        setDrinks(drinkList);
        setIsLoading(false);
      }
      getItems();
    }, []);

    const addNewItem = async (newItem) => {
      let itemFormatted = {
        ...newItem,
        id      : newItem.name.toLowerCase().replace(' ', '-'),
        userAdd : true
      };
      // logic to decide whether to add to snacks or drinks state/db
      if (newItem.type === 'snack') {
        await SnackOrBoozeApi.addSnack(itemFormatted);
        setSnacks((snacks) => [ ...snacks, itemFormatted ]);
      } else if (newItem.type === 'drink') {
        await SnackOrBoozeApi.addDrink(itemFormatted);
        setDrinks((drinks) => [ ...drinks, itemFormatted ]);
      }
    };
  if (isLoading) {
    return <p style={{ color: 'white' }}>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
          <Route exact path="/">
            <Home snacks={snacks} />
            </Route>
            <Route exact path="/snacks">
              <Menu items={snacks} title="Snacks" />
            </Route>
            <Route exact path="/drinks">
            <Menu items={drinks} title="Drinks" />
            </Route>
            <Route path="/snacks/:id">
              <MenuItem items={snacks} cantFind="/snacks" />
            </Route>
            <Route path="/drinks/:id">
              <MenuItem items={drinks} cantFind="/drinks" />
            </Route>
            <Route exact path="/add">
              <AddForm add={addNewItem} toggleLoad={setIsLoading} />
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
