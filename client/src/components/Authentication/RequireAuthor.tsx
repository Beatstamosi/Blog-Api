import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth.tsx";

interface RequireAuthorProps {
  children: React.ReactNode;
}

function RequireAuthor({ children }: RequireAuthorProps) {
  const { isAuthenticated, loading, isAuthor } = useAuth();

  if (loading) return null;

  if (!isAuthenticated || !isAuthor) {
    return <Navigate to="/sign-up-author" replace />;
  }

  return children;
}

export default RequireAuthor;
