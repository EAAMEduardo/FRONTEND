import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import About from "./pages/About"
import {AuthProvider} from "./context/AuthContext"
import PrivateRoutes from "./components/PrivateRoutes"
import Profile from "./pages/Profile"
import ListingPage from "./pages/ListingPage"
import UpdateListing from "./pages/UpdateListing"
import ShowListings from "./pages/ShowListings"
import Listing from "./pages/Listing"
import Search from "./pages/Search"
import FavoritePage from "./pages/FavoritePage"


function App() {
 

  return (
    <AuthProvider>
     <BrowserRouter>
      <Navbar></Navbar>
        <Routes>
            <Route path="/register" element={<Register></Register>}></Route>
            <Route path="/login" element={<Login></Login>}></Route>
            <Route path="/about" element={<About></About>}></Route>
            <Route path="/listing/:id" element={<Listing></Listing>}></Route>
            <Route path="/search" element={<Search></Search>}></Route>
            <Route path="/" element={<h1>is not auth</h1>}></Route>
            <Route element={<PrivateRoutes></PrivateRoutes>}>
              <Route path="/landing" element={<ShowListings></ShowListings>}></Route>
            <Route path="/create-listing" element={<ListingPage></ListingPage>}></Route>
            <Route path="/listings/:id" element={<HomePage></HomePage>}></Route>
            <Route path="/profile/:id" element={<Profile></Profile>}></Route>
            <Route path="/update/listing/:id" element={<UpdateListing></UpdateListing>}></Route>
            <Route path="/favorites/:id" element={<FavoritePage></FavoritePage>}></Route>
            </Route>
        </Routes>
     </BrowserRouter>
   </AuthProvider>
  )
}

export default App
