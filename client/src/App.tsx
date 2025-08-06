import { Outlet } from "react-router-dom";
import { useAuth } from "./components/Authentication/useAuth.js";
import NavBar from "./components/NavBar/NavBar.js";

function App() {
  const { loading } = useAuth();

  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;
