import { BrowserRouter, Route, Routes } from 'react-router-dom';

//Pages:
import Books from './pages/Books';
import ContentManagement from './pages/ContentManagement';
import Home from './pages/Home';
import Login from './pages/Login';
import Music from './pages/Music';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import Regester from './pages/Regester';
import Videos from './pages/Videos';


export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Home/>} index/>
            <Route path='/books' element={<Books/>}/>
            <Route path='/music' element={<Music/>}/>
            <Route path='/videos' element={<Videos/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/regester' element={<Regester/>}/>
            <Route path='/me' element={<Profile/>}/>
            <Route path='/content' element={<ContentManagement/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  )
}
