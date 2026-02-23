"use client";

import { Outlet } from "@tanstack/react-router";
import { Sidebar } from "./sidebar";
import { CommandCenter } from "./cmd-k";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";

export function AppLayout() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-screen overflow-hidden bg-background text-foreground transition-colors">
            <Sidebar />
            <main className="flex-1 overflow-y-auto">
                <header className="flex items-center justify-between p-4 border-b border-white/5 glass-panel sticky top-0 z-10">
                    <CommandCenter />
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium animate-pulse text-primary tracking-wider">
                            HUB Consumer Finance
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>
                </header>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
