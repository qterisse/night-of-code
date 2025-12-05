import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router';
import LandingPage from './containers/LandingPage.tsx';
import './index.css';
import Lobby from './containers/Lobby.tsx';
import { AppProvider } from './contexts/AppContext.tsx';
import GamePage from './containers/GamePage.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
	{
    path: "/game",
    element: <GamePage />,
  },
]);
  
createRoot(document.getElementById('root')!).render(
	<AppProvider>
		<RouterProvider router={router} />
	</AppProvider>,
)
