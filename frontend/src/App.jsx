import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router';
import ROUTES from './routes/router';
const router = createBrowserRouter(ROUTES)

function App() {
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
