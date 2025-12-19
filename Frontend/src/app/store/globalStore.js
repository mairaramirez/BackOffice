import { useState } from "react";

export function useGlobalStore() {
    const [theme, setTheme] = useState("light");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return {
        theme,
        setTheme,
        sidebarOpen,
        setSidebarOpen
    };
}
