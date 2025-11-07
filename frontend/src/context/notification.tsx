/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useMemo, type FC, type ReactNode } from "react";

const defaultValue = {
  message: "",
  notify: () => { },
};

type NotiContextProp = {
  message: string;
  notify: React.Dispatch<React.SetStateAction<string>>;
}

const NotiContext = createContext<NotiContextProp>(defaultValue);

type NotiProviderProps = {
  children: ReactNode;
}
export const NotiProvider: FC<NotiProviderProps> = ({ children }) => {
  const [message, notify] = useState("");
  const value = useMemo<NotiContextProp>(() => ({ message, notify }), [message]);
  return <NotiContext.Provider value={value}>{children}</NotiContext.Provider>;
};

export const useToast = () => {
  return useContext(NotiContext);
};
