import { Route } from "react-router-dom";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { Dashboard } from "@/components/pages/Dashboard";

export const privateRoutes = (
  <Route element={<AuthGuard />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>
);
