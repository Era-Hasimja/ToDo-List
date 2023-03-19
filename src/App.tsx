import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from "./components/Details";
import { InProgress } from "./components/InProgress";
import { Done } from "./components/Done";
import { ViewUsers } from "./components/ViewUsers";
function App() {
  return (
    <div>
      <h3 className="text-black text-center  p-2 ">TODO List</h3>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/in-progress" element={<InProgress />}></Route>
          <Route path="/done" element={<Done />}></Route>
          <Route path="/users" element={<ViewUsers />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
