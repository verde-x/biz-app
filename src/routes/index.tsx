import { memo, type FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";
import { Page404 } from "@/components/pages/NotFound";
import { useAuth } from "@/hooks/useAuth";

export const AppRouter: FC = memo(() => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          session ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      {publicRoutes}
      {privateRoutes}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
});
