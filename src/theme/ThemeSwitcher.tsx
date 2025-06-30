import { useEffect, useState } from "react";

const themes = ["spring", "summer", "autumn", "winter", "pink"];

export function ThemeSwitcher() {
    const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "spring");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <select
            className="border border-[hsl(var(--primary))] bg-[hsl(var(--background))] text-[hsl(var(--foreground))] px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] transition-colors"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
        >
            {themes.map((t) => (
                <option key={t} value={t}>
                    {t}
                </option>
            ))}
        </select>

    );
}
