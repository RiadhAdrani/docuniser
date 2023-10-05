import TopBar from '@/components/Navigation/Top.Bar';
import { DataProvider } from '@/context/Data.context';
import { UIProvider } from '@/context/UI.context';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

const DefaultLayout = () => {
  return (
    <DataProvider>
      <UIProvider>
        <Toaster richColors />
        <TopBar />
        <div
          className=" col p-5 w-full xl:w-1280px lg:m-x-auto"
          style={{ minHeight: 'calc(100vh - 65px)' }}
        >
          <Outlet />
        </div>
      </UIProvider>
    </DataProvider>
  );
};

export default DefaultLayout;
