import { Outlet } from 'react-router-dom';

const BaseLayout = () => (
  <div className="h-screen w-screen bg-main-background-color">
    <div className="mx-auto my-0 flex w-4/5 justify-center">
      <Outlet />
    </div>
  </div>
);

export default BaseLayout;
