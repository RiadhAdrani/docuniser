import { createHashRouter } from 'react-router-dom';
import HomePage from './pages/Home.page';
import DocumentPage from './pages/Document.page';
import DefaultLayout from './layout/Default.layout';

const browserRouter = createHashRouter(
  [
    {
      element: <DefaultLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/document', element: <DocumentPage /> },
      ],
    },
  ],
  {}
);

export default browserRouter;
