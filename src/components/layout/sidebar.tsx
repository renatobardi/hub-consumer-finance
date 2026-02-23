"use client";

import { Link, useLocation } from "@tanstack/react-router";
import { Activity, ShieldAlert, Cpu, GitMerge, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"; // Need to install tooltip

export function Sidebar() {
    const location = useLocation();

    const links = [
        { href: "/", icon: Activity, label: "Command Center" },
        { href: "/service/core-billing", icon: Cpu, label: "Core Billing Service" },
        { href: "/finops", icon: DollarSign, label: "FinOps Cost Explorer" },
        { href: "/appsec", icon: ShieldAlert, label: "AppSec Security" },
        { href: "/actions", icon: GitMerge, label: "CI/CD & Deployments" },
    ];

    return (
        <aside className="w-16 flex flex-col items-center py-6 gap-6 glass-panel border-r border-white/10 z-20">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                <Cpu className="text-white w-5 h-5" />
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
                                        : "text-muted-foreground hover:bg-white/5 hover:text-white"
                                )}
                            >
                                <link.icon className="w-5 h-5" />
                            </div>
                            {/* Optional: Add active indicator dot */}
                            {isActive && (
                                <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                            )}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
