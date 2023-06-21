import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/home/Landing";
import SignInPage from "./pages/login/SigInpage";
import SignUpPage from "./pages/signup/SignUpPage";
import { createContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

const UserContext = createContext();
function App() {

  const [activeUser, setActiveUser] = useState();
  const [activePopup, setActivePopup] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [activeSort, setActiveSort] = useState();
  const [sortBy, setSortBy] = useState();
  const [modifyStatus, setModifyStatus] = useState();
  const [editCandidate, setEditCandidate] = useState();
  const [sortUpdateState, setSortUpdateState] = useState();
  useEffect(() => {

    const isSessionActive   = () => {
      //check if user is logged in
      const currUser = JSON.parse(localStorage.getItem('feedbackUser'));
      if (currUser) {
        setActiveUser(true);
      }
      else {
        setActiveUser(false);
      }
    }

    isSessionActive();
    setActiveSort('All');
    setSortBy('Select');
    setModifyStatus(false);
  }, [])


  return (
    <UserContext.Provider
      value={{
        activeUser, setActiveUser,
        activePopup, setActivePopup,
        isVisible,setIsVisible,
        activeSort, setActiveSort,
        sortBy, setSortBy,
        modifyStatus, setModifyStatus,
        editCandidate, setEditCandidate,
        sortUpdateState, setSortUpdateState
      }}
    >


      <div>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<LandingPage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<SignInPage />} />
            </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center" autoClose={false} closeOnClick />
      </div>
    </UserContext.Provider>
  );
}


export default App;
export { UserContext };