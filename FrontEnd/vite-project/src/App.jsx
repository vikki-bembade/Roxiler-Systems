import React from 'react'
import RegisterPage from './Pages/RegisterPage'
import Login from './Pages/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashBoard from './componants/Admin/DashBoard';
import AdmindashBoard from './Pages/AdmindashBoard';
import UserdashBoard from './Pages/UserdashBoard';
import ShowDtails from './componants/Store/ShowDtails';
import AddNewStore from './componants/Admin/AddNewStore';
import AddNewUser from './componants/Admin/AddNewUser';
import ShowOwnerList from './componants/Admin/ShowOwnerList';
import ShowStoreList from './componants/Admin/ShowStoreList';
import ShowUserList from './componants/Admin/ShowUserList';
import ShowStoreListUser from './componants/User/ShowStoreListUser';
import StoreDashBoard from './Pages/StoreDashBoard';

const App = () => {
  return (
    
      <div className='flex flex-col'>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/DashBoard" element={<DashBoard />} />
          <Route path="/AdmindashBoard" element={<AdmindashBoard />} />
          <Route path="/UserdashBoard" element={<UserdashBoard />} />
          <Route path="/ShowDtails" element={<ShowDtails />} />
          <Route path="/ShowStoreListUser" element={<ShowStoreListUser />} />
          <Route path="/AddNewStore" element={<AddNewStore />} />
          <Route path="/AddNewUser" element={<AddNewUser />} />
          <Route path="/ShowOwnerList" element={<ShowOwnerList />} />
          <Route path="/ShowStoreList" element={<ShowStoreList />} />
          <Route path="/ShowUserList" element={<ShowUserList />} />
          <Route path="/StoreDashBoard" element={<StoreDashBoard />} />
        </Routes>
      </div>
    
  )
}

export default App