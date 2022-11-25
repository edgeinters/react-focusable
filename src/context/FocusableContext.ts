import React from "react";

import { focus } from "../store";
import { Focusable } from "../store/focusable";

export const FocusableContext = React.createContext<Focusable>(focus)