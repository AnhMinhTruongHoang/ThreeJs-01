import Canvas from "./canvas";
import Customized from "./pages/Customized";
import Home from "./pages/Home";

function App() {
  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      <Customized />
    </main>
  );
}

export default App;
