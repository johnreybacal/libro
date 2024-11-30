import { createContext } from "react";
import { GlobalContextInterface } from "../types";

export const GlobalContext = createContext<GlobalContextInterface>({
  resultFormat: "Default",
  setResultFormat: () => {},
  theme: "light",
  setTheme: () => {},
});
