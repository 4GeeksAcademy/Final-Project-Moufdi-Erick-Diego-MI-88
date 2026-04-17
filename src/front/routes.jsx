import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import { SignUp } from "./pages/SignUpPage";
import { LogIn } from "./pages/LogInPage";
import { ForgotPassword } from "./pages/ForgotPasswordPage";
import { UserProfilePage } from "./pages/UserProfilePage";
import { BusinessSignUp } from "./pages/BusinessSignUpPage";
import { BusinessPageProfile } from "./pages/BusinessPageProfile";
import { DiscountPage } from "./components/DiscountPage";
import AboutUs from "./pages/AboutUsPage";
import ContactUs from "./pages/contact-us";
import AdminMessages from "./pages/AdminMessages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
      <Route path="/" element={<Home />} />
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<LogIn />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user-profile" element={<UserProfilePage />} />
      <Route path="/business-signup" element={<BusinessSignUp />} />
      <Route path="/business/:id" element={<BusinessPageProfile />} />
      <Route path="/business/:id/discounts" element={<DiscountPage />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/contact-us" element={<ContactUs />} />
      <Route path="/admin/messages" element={<AdminMessages />} />
    </Route>
  )
);

