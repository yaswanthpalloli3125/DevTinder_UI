import Body from "./Components/Body";
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Feed from "./Components/Feed";
import appStore from "./utils/appstore";
import {Provider} from "react-redux";
import Connections from "./Components/Connections";
import Requests from "./Components/Requests";

function App() {
  return (
    <>
      <Provider store={appStore}>
      <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Body/>}>
             <Route path="/" element={<Feed/>}/>
             <Route path="/login" element={<Login/>} />
             <Route path="/profile" element={<Profile/>} />
             <Route path="/connections" element={<Connections/>}/>
             <Route path="/requests" element={<Requests/>}/>
        </Route>
      </Routes>
      
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
