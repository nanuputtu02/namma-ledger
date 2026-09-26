import {Navigate, Route, Routes} from 'react-router-dom';
import AppLayout from './layouts/AppLayout';
import Login from './pages/Login';
import Overview from './pages/Overview';
import MonthlyLedger from './pages/MonthlyLedger';
import Goals from './pages/Goals';
import YearlyView from './pages/YearlyView';
import Settings from './pages/Settings';
import {getSession} from './services/storage';

function Protected({children}:{children:React.ReactNode}) { return getSession() ? <AppLayout>{children}</AppLayout> : <Navigate to="/login" replace/>; }
export default function App(){
  return <Routes>
    <Route path="/login" element={getSession()?<Navigate to="/overview" replace/>:<Login/>}/>
    <Route path="/" element={<Navigate to={getSession()?'/overview':'/login'} replace/>}/>
    <Route path="/overview" element={<Protected><Overview/></Protected>}/>
    <Route path="/monthly-ledger" element={<Protected><MonthlyLedger/></Protected>}/>
    <Route path="/goals" element={<Protected><Goals/></Protected>}/>
    <Route path="/yearly-view" element={<Protected><YearlyView/></Protected>}/>
    <Route path="/settings" element={<Protected><Settings/></Protected>}/>
    <Route path="*" element={<Navigate to="/" replace/>}/>
  </Routes>;
}
