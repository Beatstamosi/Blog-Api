import { useAuth } from "../Authentication/useAuth";
import { Link } from "react-router-dom";
import style from "./NavBar.module.css";
import LogOut from "../Authentication/LogOut/LogOut";

function NavBar() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className={style.navBarWrapper}>
      <div>
        <Link to={"/"}>
          <h2>MyBlog</h2>
        </Link>
        {user?.isAuthor && <Link to={"/admin"}>Admin</Link>}
      </div>
      <div>
        {!isAuthenticated ? (
          <Link to={"/login"} className={style.btn}>
            Login
          </Link>
        ) : (
          <LogOut />
        )}
      </div>
    </div>
  );
}

export default NavBar;
