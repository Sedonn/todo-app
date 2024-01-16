import { Outlet } from 'react-router-dom';

import { ToastContainer, Zoom, toast } from 'react-toastify';

const BaseLayout = () => (
  <div className="h-screen w-screen bg-main-background-color">
    <div className="mx-auto my-0 flex w-4/5 justify-center">
      <Outlet />
    </div>
    <ToastContainer
      autoClose={4000}
      transition={Zoom}
      theme="colored"
      position={toast.POSITION.TOP_RIGHT}
    />
  </div>
);

export default BaseLayout;
