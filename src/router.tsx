import { createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/Home.page';

const browserRouter = createBrowserRouter([{ path: '/', element: <HomePage /> }]);

export default browserRouter;
