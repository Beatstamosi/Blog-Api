import App from "../App";
import ErrorPage from "./ErrorPage/ErrorPage.jsx";
import LogOut from "./Authentication/LogOut/LogOut.jsx";
import Login from "./Authentication/Login/Login.jsx";
import SignUp from "./Authentication/Sign Up/SignUp.jsx";
import RequireAuth from "./Authentication/RequireAuth.jsx";
import SignUpAuthor from "./Authentication/SignUp Author/SignUpAuthor.js";
import Home from "./Home/Home.js";
import DisplaySinglePost from "./DisplaySinglePost/DisplaySinglePost.js";
import AuthorHome from "./Author/AuthorHome/AuthorHome.js";
import RequireAuthor from "./Authentication/RequireAuthor.js";
import WritePost from "./Author/WritePost/WritePost.js";
import NavBar from "./NavBar/NavBar.js";
import EditPost from "./EditPost/EditPost.js";
import ShowComments from "./Author/ShowComments/ShowComments.js";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/:postId",
        element: <DisplaySinglePost />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/sign-up-author",
    element: <SignUpAuthor />,
  },
  {
    path: "/logout",
    element: (
      <RequireAuth>
        <LogOut />
      </RequireAuth>
    ),
  },
  {
    path: "/author",
    errorElement: <ErrorPage />,
    element: (
      <RequireAuthor>
        <NavBar />
        <AuthorHome />
      </RequireAuthor>
    ),
  },
  {
    path: "/author/write-post",
    element: <WritePost />,
  },
  {
    path: "/author/edit/:postId",
    element: <EditPost />,
  },
  {
    path: "/author/:postId/show-comments",
    element: <ShowComments />,
  },
  {
    path: "/error",
    element: <ErrorPage />,
  },
];

export default routes;
