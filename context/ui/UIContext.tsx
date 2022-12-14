import { createContext } from "react";

interface ContextProps {
  sidemenuOpen: boolean;
  //Methods
  openSideMenu: () => void;
  closeSideMenu: () => void;

  isAddingEntry: boolean;
  //Methods
  setIsAddingEntry: (isAdding: boolean) => void;
  endDragging: () => void;
  startDragging: () => void;

  isDragging: boolean;
}

export const UIContext = createContext({} as ContextProps);
