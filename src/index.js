import ReactDOM from "react-dom/client";
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
    RouterProvider
} from "react-router-dom";
import {Home} from "./pages/Home";
import {Locations} from "./pages/Locations";
import {Episodes} from "./pages/Episodes";
import {About} from "./pages/About";
import {Empty} from "./pages/Empty";
import {Characterpage} from "./info pages/characterpage";
import App from "./App";
import {Locationpage} from "./info pages/locationpage";
import {EpisodePage} from "./info pages/episodepage";
const root = ReactDOM.createRoot(document.getElementById('root'));
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path="/"
                       element={<App />}>
                </Route>
                <Route path={"/locations"}
                       element={<Locations/>}>
                </Route>
                <Route path={"/episodes"}
                       element={<Episodes/>}>
                </Route>
                    <Route path={"/character"}
                           element={<Home/>}>
                    </Route>
                <Route path={"/about"}
                       element={<About/>}>
                </Route>
                <Route path={"/form-send"}
                       element={<Empty/>}>
                </Route>
                <Route path={"/character/:id"}
                       element={<Characterpage/>}>
                </Route>
                <Route path={"/location/:id"}
                       element={<Locationpage/>}>
                </Route>
                <Route path={"/episode/:id"}
                       element={<EpisodePage/>}>
                </Route>
            </>
        )
    )



root.render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>
);