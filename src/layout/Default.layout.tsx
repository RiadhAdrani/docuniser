import TopBar from '@/components/Navigation/Top.Bar';
import { DataProvider } from '@/context/Data.context';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <DataProvider>
      <TopBar />
      <div
        className="w-1200px col m-x-auto justify-stretch"
        style={{ minHeight: 'calc(100vh - 65px)' }}
      >
        <Outlet />
      </div>
    </DataProvider>
  );
};

export default DefaultLayout;
