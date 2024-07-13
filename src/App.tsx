import React, { useState } from 'react';

import AdminMenu from './components/AdminMenu/AdminMenu';
import UserMenu from './components/UserMenu/UserMenu';

import './App.css';

function App() {
  const [adminAuth, setAdminAuth] = useState(false);

  function adminAuthButtonHandler() {
    setAdminAuth(true);
  }

  function backToUserMenuButtonHandler() {
    setAdminAuth(false);
  }

  return (
    <div className="App">
      {adminAuth ? (<>
        
        <AdminMenu adminAuthCb={backToUserMenuButtonHandler} />
      </>) : (<>
        <button onClick={adminAuthButtonHandler}>Вход для администратора</button><br></br>
        <UserMenu />
      </>)}
    </div>
  );
}

export default App;
