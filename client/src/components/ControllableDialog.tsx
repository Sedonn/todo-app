import {
  PropsWithChildren,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { Modal, StrictModalProps } from 'semantic-ui-react';

export type ControllableDialogRefAttributes = {
  open: () => void;
  close: () => void;
};

const ControllableDialog = forwardRef<
  ControllableDialogRefAttributes,
  PropsWithChildren<StrictModalProps>
>(({ children, ...props }, ref) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const open = () => setIsOpen(true);

  const close = () => setIsOpen(false);

  useImperativeHandle(ref, () => ({ open, close }));

  return (
    <Modal {...props} open={isOpen}>
      {children}
    </Modal>
  );
});

export default ControllableDialog;
