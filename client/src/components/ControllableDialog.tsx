/** @fileoverview Wrapper for the {@link Modal} for controlling by a {@link React.Ref}. */

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

/** Wrapper for the {@link Modal} for controlling by a {@link React.Ref}. */
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

ControllableDialog.displayName = 'ControllableDialog';

export default ControllableDialog;
