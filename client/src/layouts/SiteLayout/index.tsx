import { PropsWithChildren } from 'react';

import { ToastContainer, Zoom, toast } from 'react-toastify';

const SiteLayout = ({ children }: PropsWithChildren) => (
  <div className="h-screen w-screen bg-main-background-color">
    <div className="mx-auto my-0 flex w-4/5 justify-center">{children}</div>
    <ToastContainer
      autoClose={4000}
      transition={Zoom}
      theme="colored"
      position={toast.POSITION.TOP_RIGHT}
    />
  </div>
);

export default SiteLayout;
