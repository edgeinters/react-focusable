import React from "react";

import { focus } from "../store";
import { FocusableContainer } from "../store/focusableContainer";

export const FocusableContext = React.createContext<FocusableContainer>(focus)