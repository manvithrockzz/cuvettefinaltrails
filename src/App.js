import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/Landing";
import LoginPage from "./pages/login/SigInpage";
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
  const [updateAvailable, setUpdateAvailable] = useState();
  const [productToEdit, setProductToEdit] = useState();
  const [filterUpdateAvailable, setFilterUpdateAvailable] = useState();
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
    setUpdateAvailable(false);
  }, [])



  return (
    <UserContext.Provider
      value={{
        activeUser, setActiveUser,
        activePopup, setActivePopup,
        isVisible,setIsVisible,
        activeSort, setActiveSort,
        sortBy, setSortBy,
        updateAvailable, setUpdateAvailable,
        productToEdit, setProductToEdit,
        filterUpdateAvailable, setFilterUpdateAvailable
      }}
    >


      <div>
        <BrowserRouter>
          <Routes >
            <Route path="/" element={<HomePage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer position="top-center" autoClose={false} closeOnClick />
      </div>
    </UserContext.Provider>
  );
}

export default App;
export { UserContext };