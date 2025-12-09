import { Route } from "react-router-dom";
import { Login } from "@/components/pages/Login";
import { SignUp } from "@/components/pages/SignUp";

export const publicRoutes = (
  <>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </>
);
