import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import { ColorContextProvider } from "./Store/themeContext";

function App() {
  return (
    <ColorContextProvider>
      <div>
        <NavBar />
        <Home />
      </div>
    </ColorContextProvider>
  );
}

export default App;
