import { useAuth } from "../Authentication/useAuth";

function Home() {
  const { user } = useAuth();

  // HEADER for blog
  // Display posts

  return (
    <>
      <h1>{user?.email || "No user found"}</h1>
      <p>
        {user?.firstName} {user?.lastName}
      </p>
    </>
  );
}

export default Home;
