import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage.jsx";
import DonationPage from "./pages/DonationPage/DonationPage.jsx";
import CommunityHub from "./pages/CommunityHub/CommunityHub.jsx";
import TransactionPage from "./pages/TransactionPage/TransactionPage.jsx";
import ProfilePage from "./pages/ProfilePage/ProfilePage.jsx";
import RanksBadges from "./pages/RanksBadges/RanksBadgesPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Partners from "./pages/Partners/Partners.jsx";
import SignUp from "./pages/SignUp/SignUp.jsx";
import MapsPage from "./pages/MapsPage/MapsPage.jsx";
import SignUpOrg from "./pages/SignUp/SignUpOrg.jsx";
import SignUpUser from "./pages/SignUp/SignUpUser.jsx";
import LoginOrg from "./pages/Login/LoginOrg.jsx";
import LoginUser from "./pages/Login/LoginUser.jsx";
import TransactionSender from "./pages/TransactionSender/TransactionSend.jsx";
import InventoryPage from "./pages/InventoryPage/InventoryPage.jsx";
import RequestPage from "./pages/RequestPage/RequestPage.jsx";


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/donations" element={<DonationPage />} />
          <Route path="/community" element={<CommunityHub />} />
          <Route path="/ranks-badges" element={<RanksBadges />} />      
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/inventory" element={<InventoryPage />} />
          <Route path="/profile/request" element={<RequestPage />} />
          <Route path="/transactions" element={<TransactionPage />} />
          <Route path="/transactions/sender" element={<TransactionSender />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/maps" element={<MapsPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup/create-as-org" element={<SignUpOrg />} />
          <Route path="/signup/create-as-user" element={<SignUpUser />} />

          <Route path="/login/as-org" element={<LoginOrg />}></Route>
          <Route path="/login/as-user" element={<LoginUser />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
