import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ParticipantsList = lazy(() => import("./pages/ParticipantsList"));
const Home = lazy(() => import("./pages/Home"));
const Header = lazy(() => import("./components/Header"));
const Footer = lazy(() => import("./components/Footer"));
const Events = lazy(() => import("./pages/Events"));
const DynamicRegister = lazy(() => import("./pages/DynamicRegister"));
const Contact = lazy(() => import("./pages/Contact"));


function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/admin" element={<ParticipantsList />} />
        <Route path="/register/:event" element={<DynamicRegister />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
