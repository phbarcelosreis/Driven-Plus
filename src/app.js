import Rotas from "./route";
import { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./assets/styles/GlobalStyle";

export const UserContext = createContext({});

function App(){
    return(

        <Router>
            <UserContext.Provider value={{  }}>


                <GlobalStyle />

                <Rotas />

            </UserContext.Provider>
        </Router>
    )
}

export default App;