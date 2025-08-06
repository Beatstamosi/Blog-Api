import style from "./Header.module.css";

function Header() {
  return (
    <div className={style.headerWrapper}>
      <h2>Welcome to my awesome blog!</h2>
      <p>
        This is where I write about things I find interesting. Hope you find
        them interesting as well!
      </p>
    </div>
  );
}

export default Header;
