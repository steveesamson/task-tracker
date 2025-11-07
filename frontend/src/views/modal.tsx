import { type FC, type ReactNode } from "react";
import Display from "./display-when";
import "./dialog.css";

type ModalProps = {
  children: ReactNode;
  open: boolean;
}
// Modal
const Modal: FC<ModalProps> = ({ children, open = false }) => {
  return (
    <Display when={open}>
      <section className="dialog-back-drop">
        <fieldset className="dialog modal">{children}</fieldset>
      </section>
    </Display>
  );
};

export default Modal;