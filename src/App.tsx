import { Home } from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Details } from "./components/Details";
import { InProgress } from "./components/InProgress";
import { Done } from "./components/Done";
function App() {
  return (
    <div>
      <h3 className="text-black text-center p-2 font-weight-normal">
        TODO List
      </h3>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/details" element={<Details />}></Route>
          <Route path="/in-progress" element={<InProgress />}></Route>
          <Route path="/done" element={<Done />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
