"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { Activity, ShieldAlert, Cpu, GitMerge, DollarSign, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

export function Sidebar() {
    const location = useLocation();
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const links = [
        { href: "/", icon: Activity, label: "Command Center" },
        { href: "/service/core-billing", icon: Cpu, label: "Core Billing Service" },
        { href: "/finops", icon: DollarSign, label: "FinOps Cost Explorer" },
        { href: "/appsec", icon: ShieldAlert, label: "AppSec Security" },
        { href: "/actions", icon: GitMerge, label: "CI/CD & Deployments" },
    ];

    return (
        <aside className="w-16 flex flex-col items-center py-6 gap-6 glass-panel border-r border-border z-20">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <Cpu className="text-primary-foreground w-5 h-5" />
            </div>

            <nav className="flex flex-col gap-4 mt-8 flex-1">
                {links.map((link) => {
                    const isActive = location.pathname === link.href || (link.href !== '/' && location.pathname.startsWith(link.href));
                    return (
                        <Link key={link.href} to={link.href} className="group relative">
                            <div
                                className={cn(
                                    "p-3 rounded-xl transition-all duration-300",
                                    isActive
                                        ? "bg-primary/20 text-primary shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                            </div>
                            {isActive && (
                                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>

            <div className="flex flex-col gap-2 pb-2">
                {['pt', 'en', 'es'].map((lang) => (
                    <button
                        key={lang}
                        onClick={() => changeLanguage(lang)}
                        className={cn(
                            "text-[10px] font-bold w-8 h-8 rounded-lg transition-all uppercase",
                            i18n.language === lang
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                        )}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </aside>
    );
}
