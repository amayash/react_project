import { useRoutes, Outlet, BrowserRouter } from 'react-router-dom'
import MainPage from './pages/MainPage'
import CurrPage from './pages/CurrPage'
import WillSee from './pages/WillSee'
import SearchSame from './pages/SearchSame'
import Registration from './pages/Registration'
import Header from './pages/components/Header'
import Footer from './pages/components/Footer'

function Router(props) {
  return useRoutes(props.rootRoute);
}

export default function App() {
  const routes = [
    { index: true, element: <MainPage /> },
    { path: '/mainPage', element: <MainPage /> },
    { path: '/mainPage/:id', element: <CurrPage /> },
    { path: '/registration', element: <Registration />, label: 'Регистрация' },
    { path: '/willSee', element: <WillSee />, label: 'Корзина' },
    { path: '/search-same/:request', element: <SearchSame /> }
  ];
  const links = routes.filter(route => route.hasOwnProperty('label'));
  const rootRoute = [
    { path: '/', element: render(links), children: routes }
  ];

  function render(links) {
    return (
      <>
        <Header links={links} />
          <Outlet />
        <Footer />
      </>
    );
  }

  return (
    <BrowserRouter>
      <Router rootRoute={ rootRoute } />
    </BrowserRouter>
  );
}