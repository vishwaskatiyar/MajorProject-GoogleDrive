import { useState } from "react";
import Header from "./Component/Header";

import Sidebar from "./Component/Sidebar/Sidebar";

function App() {
  const [user, setUser] = useState({
    displayName: "Vishwas katiyar",
    email: "Vishwas39@gmail.com",
    emailVerified: true,
    honeNumber: null,
    photoUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3BNZw4G45qsnyRTopol8ESLnkfejmN_WcA&usqp=CAU",
  });
  // authentication
  return (
    <div className="App">
      <Header userPhoto={user.photoUrl} />

      <Sidebar />
      {/* auth =true 
     
      fileView
      Sidebar 
       */}
      {/* no auth:log in*/}
    </div>
  );
}

export default App;
