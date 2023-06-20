import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import './style.scss'
import { PageShowAll } from "./page/PageShowAll";
import PageShowPeople from "./page/PageShowPeople";
import { PageShowAnimal } from "./page/PageShowAnimal";
import PageShowNature from "./page/PageShowNature";
import PageShowTechnology from "./page/PageShowTechnology";
import PageShowTransport from "./page/PageShowTransport";
import PageUpload from "./page/PageUpload";
import PageDetailImage from "./page/PageDetailImage";


const Layout = () => {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <PageShowAll/>,
      },
      {
        path: "/People",
        element: <PageShowPeople/>,
      },
      {
        path: "/Animal",
        element: <PageShowAnimal/>,
      },
      {
        path: "/Nature",
        element: <PageShowNature/>,
      },
      {
        path: "/Technology",
        element: <PageShowTechnology/>,
      },
      {
        path: "/Transport",
        element: <PageShowTransport/>,
      },
      {
        path: "/Detail/:id",
        element: <PageDetailImage/>,
      }
    ],
  },
  {
    path: "/addImg",
    element: <PageUpload/>
  }
]);

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
