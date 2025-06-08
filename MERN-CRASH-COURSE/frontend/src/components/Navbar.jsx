import { Link } from "react-router-dom";
import ThemeToggleButton from "./ThemeToggleButton";
import CreatePage from "../pages/CreatePage";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container d-flex justify-content-between align-items-center">
        <Link className="navbar-brand" to="/">AGUSTÍN TIN TIN</Link>
        <ThemeToggleButton />
        <Link to="/create" className="btn btn-primary">Nuevo</Link>
      </div>
    </nav>
  );
};

export default Navbar;
