import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Home from "./views/home/Home";
import Register from "./views/register/Register";
import Layout from "./views/layout/Layout";
import Login from "./views/login/Login";
import Logout from "./views/logout/Logout";
import MySurveys from "./views/my-surveys/MySurveys";
import NewSurvey from "./views/new-survey/NewSurvey";
import EditSurvey from "./views/edit-survey/EditSurvey";
import Survey from "./views/survey/Survey";
import Results from "./views/results/Results";
import "react-toastify/dist/ReactToastify.css";
import "./utilities/ReactToastifyOverride.css";
import Profile from "./views/profile/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="" element={<Home />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                    <Route path="my-surveys" element={<MySurveys />} />
                    <Route path="edit-survey/:id" element={<EditSurvey />} />
                    <Route path="survey/:hash" element={<Survey />} />
                    {/* <Route path="results" element={<></>} /> */}
                    <Route path="results/:id" element={<Results />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="logout" element={<Logout />} />
                    <Route path="new-survey" element={<NewSurvey />} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Route>
            </Routes>
            <ToastContainer position="bottom-right" transition={Slide} theme="colored" autoClose={3000} />
        </BrowserRouter>
    );
}

export default App;
