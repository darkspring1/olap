import React, { useState, useCallback } from "react";
import { Hello } from "./Hello"

function App() {
  const [name, setState] = useState("anshul GoYAL");
  const handleCahnge = useCallback(e => setState(e.target.value));
  return (
    <>
      Hi
      <Hello compiler="typescript"></Hello>
    </>
  );
}

export default App;