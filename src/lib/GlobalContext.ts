import { createContext } from "react";
import { GlobalContextInterface } from "../types/types";

export const GlobalContext = createContext<GlobalContextInterface>({
  resultFormat: "Default",
  setResultFormat: () => {},
  theme: "light",
  setTheme: () => {},
});
