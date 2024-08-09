import { BrowserRouter, Route, Routes } from 'react-router-dom';

import KFCalendar from '@components/Dashboard/Calendar/KFCalendar';

import HomeDashboard from '@components/Dashboard/HomeDashboard';
import KidForm from '@components/KidsInfo/KidForm';
import LandingLayout from '@components/shared/LandingLayout';
import { AuthProvider } from '@context/AuthContext';
import { EventProvider } from '@context/EventContext';
import Activate from '@pages/Activate/Activate';
import Dashboard from '@pages/Dashboard';
import FeaturesPage from '@pages/FeaturesPage';
import ForgetPassword from '@pages/ForgetPassword';
import Home from '@pages/Home';
import PasswordChanged from '@pages/PasswordChanged';
import Register from '@pages/Register';
import ResetPassword from '@pages/ResetPassword';
import Signin from '@pages/Signin';
import ProtectedRoute from '@utils/protectedRoute';
import PublicRoute from '@utils/publicRoute';

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path='/' element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path='/features' element={<FeaturesPage />} />
          </Route>
          <Route path='/signin' element={<Signin />} />
          <Route path='/register' element={<Register />} />
          <Route
            path='/register/:email/:family/:emailVerificationToken'
            element={<Register />}
          />
          <Route
            path='/activate/:email/:emailVerificationToken'
            element={<Activate />}
          />
          <Route path='/forgot-password' element={<ForgetPassword />} />
          <Route
            path='/reset-password/:email/:resetPasswordToken'
            element={<ResetPassword />}
          />
          <Route
            path='/reset-password/:email/:resetPasswordToken'
            element={<ResetPassword />}
          />
          <Route path='/password-changed' element={<PasswordChanged />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path='/dashboard/*' element={<Dashboard />}>
            <Route
              path='calendarview'
              element={
                <EventProvider>
                  <KFCalendar />
                </EventProvider>
              }
            />
            <Route path='homedashboard' element={<HomeDashboard />} />
            <Route path='kids' element={<KidForm />} />
            {/* Need to add them when Sidebar component is refactored and uses path via router */}
            {/* <Route path='kids' />
              <Route path='messages' />
              <Route path='logout' />
              <Route path='help' /> */}
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
