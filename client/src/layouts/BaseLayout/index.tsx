import { Outlet } from 'react-router-dom';

const BaseLayout = () => (
  <div className="h-screen w-screen bg-main-background-color">
    <div className="mx-auto py-2 w-[90%] h-full flex justify-center">
      <Outlet />
    </div>
  </div>
);

export default BaseLayout;
