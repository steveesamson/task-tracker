import type { FC, ReactNode } from "react";

type DisplayProps = {
  when: boolean;
  children: ReactNode;
}
const Display: FC<DisplayProps> = ({ children, when }) => {
  return when ? children : null;
};
export default Display;
