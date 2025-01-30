import { Dialog, DialogContent } from "@smart-safety-solutions/components";
import { FunctionComponent, ReactNode } from "react";

interface ModalProps {
  readonly isOpen: boolean;
  readonly onClose: VoidFunction;
  readonly children: ReactNode;
}

const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:w-[400px] sm:h-[94vh] overflow-hidden">
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
