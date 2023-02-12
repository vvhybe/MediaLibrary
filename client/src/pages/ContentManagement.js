import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import NotFound from "./NotFound";

export default function ContentManagement() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if(!user || user.role !== "librarian"){ 
        return <NotFound/>;
    };
  return (
    <>
    <Header/>
    <Hero/>
    <Dashboard/>
    <Footer/>
    </>
  )
}
