import './App.css';
import SignUp from './app/pages/SignUp';
import Login from './app/pages/Login';
import EmailVerify from './app/pages/VerifyEmail';
import AccountSuccess from './app/pages/AccountSuccess';
import TenantManagement from './app/pages/Tenant/Management';
import Performance from './app/pages/Landlord/Performance';
import Onboarding from './app/pages/Onboarding';
import SignupRole from './app/pages/SignupRole';
import Access from './app/pages/Tenant/Access';
import TermsAndCondition from './app/pages/TermsAndCondition';
import PrivacyPolicy from './app/pages/PrivacyPolicy';
import Filter from './app/pages/FilterPage';
import Settings from './app/pages/Settings';
import Search from './app/pages/SearchPage';
import Loan from './app/pages/Loan/Loan';
import LoanApplication from './app/pages/Loan/Application';
import LoanProcess from './app/pages/Loan/Process';
import Profile from './app/pages/Profile';
import UserHome from './app/pages/Tenant/Homepage';
import LandlordHome from './app/pages/Landlord/Homepage';
import ReceiptGeneration from './app/pages/Landlord/ReceiptGeneration';
import Receipt from './app/pages/Landlord/Receipt';
import Premium from './app/pages/Landlord/Premium';
import PremiumListing from './app/pages/Landlord/PremiumListing';
import HomeType from './app/pages/HomeType';
import PaymentMethod from './app/pages/Payment';
import Paystack from './app/pages/Paystack';
import PaymentLoad from './app/pages/PaymentLoad';
import PaymentComplete from './app/pages/PaymentComplete';
import Recommendation from './app/pages/Recommendation';
import Popular from "./app/pages/Popular";
import Favourite from './app/pages/Favourite';
import Notification from './app/pages/Notification';
import ProductOverview from './app/pages/ProductOverview';
import ProductManagement from './app/pages/Product/Management';
import Chat from "./app/pages/Chat";
import ChatList from "./app/pages/ChatList";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/signup-role" component={SignupRole} />
        <Route path="/tenant/access" component={Access} />
        <Route path="/notification" component={Notification} />
        <Route path="/settings" component={Settings} />
        <Route path="/search" component={Search} />
        <Route path="/terms-and-condition" component={TermsAndCondition} />
        <Route path="/privacy-policy" component={PrivacyPolicy} />
        <Route path="/product/management" component={ProductManagement} />
        <Route path="/user/management" component={TenantManagement} />
        <Route path="/profile" component={Profile} />
        <Route path="/user/home" component={UserHome} />
        <Route path="/verify-email" component={EmailVerify} />
        <Route path="/account-success" component={AccountSuccess} />
        <Route path="/chat/product/:productId/agent/:agentId" component={Chat} />
        <Route path="/chats" component={ChatList} />
        <Route path="/user/loan" component={Loan} />
        <Route path="/loan/apply" component={LoanApplication} />
        <Route path="/loan/process" component={LoanProcess} />
        <Route path="/landlord/home" component={LandlordHome} />
        <Route path="/landlord/performance" component={Performance} />
        <Route path="/landlord/access/get-started" component={PremiumListing} />
        <Route path="/landlord/access" component={Premium} />
        <Route path="/payment/generate" component={ReceiptGeneration} />
        <Route path="/payment/receipt" component={Receipt} />
        <Route path="/payment/completed" component={PaymentComplete} />
        <Route path="/payment/load" component={PaymentLoad} />
        <Route path="/payment/paystack" component={Paystack} />
        <Route path="/payment" component={PaymentMethod} />
        <Route path="/product/home" component={HomeType} />
        <Route path="/product/recommended" component={Recommendation} />
        <Route path="/product/popular" component={Popular} />
        <Route path="/product/bookmarked" component={Favourite} />
        <Route path="/product/overview/:productId" component={ProductOverview} />
        <Route path="/product/filter" component={Filter} />
        <Route path="/product/premium" component={Premium} />
        <Route path="/" component={Onboarding} />
      </Switch>
    </Router>
  );
}

export default App;
