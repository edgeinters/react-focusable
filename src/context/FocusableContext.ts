import React from "react";

interface Focusable {
    focusables: Focusable[]
}

export const FocusableContext = React.createContext<Focusable>({})