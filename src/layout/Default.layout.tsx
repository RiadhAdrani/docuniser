import TopBar from '@/components/Navigation/Top.Bar';
import { DataProvider } from '@/context/Data.context';
import { Outlet } from 'react-router-dom';

const DefaultLayout = () => {
  return (
    <DataProvider>
      <TopBar />
      <div
        className=" col p-5 w-full xl:w-1280px lg:m-x-auto"
        style={{ minHeight: 'calc(100vh - 65px)' }}
      >
        <Outlet />
      </div>
    </DataProvider>
  );
};

export default DefaultLayout;
