"use client";

import { useEffect, useState } from "react";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { useRouter } from "@tanstack/react-router";

export function CommandCenter() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-between rounded-[0.5rem] border border-input bg-background/50 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-all lg:w-96"
            >
                <span>Pesquisar serviços, incidentes...</span>
                <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Pesquisar por Serviço, ID de Incidente ou Dono..." />
                <CommandList>
                    <CommandEmpty>Nenhum resultado encontrado.</CommandEmpty>
                    <CommandGroup heading="Serviços">
                        <CommandItem
                            onSelect={() => runCommand(() => router.navigate({ to: "/service/$serviceId", params: { serviceId: "core-billing" } }))}
                        >
                            Core Billing Service (Owner: Squad Finanças)
                        </CommandItem>
                        <CommandItem
                            onSelect={() => runCommand(() => router.navigate({ to: "/service/$serviceId", params: { serviceId: "payment-gateway" } }))}
                        >
                            Payment Gateway (Owner: Squad Checkout)
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Incidentes (ServiceNow)">
                        <CommandItem>INC-10924 - Falha na integração de Boleto</CommandItem>
                        <CommandItem>INC-22910 - Latência alta no Core Billing</CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    );
}
