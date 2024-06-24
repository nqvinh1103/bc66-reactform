import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import MyForm from "./Form/MyForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="container mx-auto my-10">
        <MyForm />
      </div>
    </>
  );
}

export default App;
