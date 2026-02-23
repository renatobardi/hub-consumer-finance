"use client";

import { useRouteContext, useParams } from "@tanstack/react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ShieldAlert, AlertTriangle, CheckCircle, RefreshCcw, DollarSign, Activity, GitBranch, TerminalSquare, ExternalLink } from "lucide-react";

import { MOCK_FINOPS_COSTS } from "@/plugins/finops/mock";
import { MOCK_SECURITY_SCORE } from "@/plugins/appsec/mock";
import { MOCK_ACTIONS, MOCK_JIRA, MOCK_SERVICENOW } from "@/plugins/github-actions/mock";
import { ReactNode } from "react";

// Inline simple i18n mock for demonstration
const t = (key: string) => {
    const dict: Record<string, string> = {
        "finops.title": "Cloud Costs & Waste",
        "finops.desc": "Projeção Financeira e Desperdício Identificado",
        "appsec.title": "Security Scorecard",
        "appsec.desc": "Conformidade e Vulnerabilidades (Snyk/GHAS)",
        "actions.title": "GitHub Actions",
        "actions.desc": "Últimas 5 runs do pipeline",
        "jira.title": "Jira & ServiceNow",
    };
    return dict[key] || key;
};

export function ServiceDetail() {
    const params = useParams({ from: "/service/$serviceId" });

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/40 pb-5">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                        {params.serviceId}
                    </h1>
                    <div className="flex gap-2 text-sm text-muted-foreground items-center">
                        <Badge variant="outline" className="border-primary/50 text-primary bg-primary/10">Squad: Finanças</Badge>
                        <Badge variant="outline" className="border-cyan-500/50 text-cyan-500 bg-cyan-500/10">Domínio: Vendas</Badge>
                        <span className="flex items-center gap-1"><Activity className="w-4 h-4 text-emerald-500" /> Healthy</span>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" className="glass-panel hover:bg-white/10">
                        <RefreshCcw className="w-4 h-4 mr-2" />
                        Sync Data
                    </Button>
                    <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                        Open Repo <ExternalLink className="w-3 h-3 ml-2" />
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="glass-panel border border-white/5 bg-transparent p-1">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-white/10 data-[state=active]:text-white">Overview Tático</TabsTrigger>
                    <TabsTrigger value="value-chain" className="data-[state=active]:bg-white/10">Cadeia de Valor</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6 space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">

                        {/* FinOps Card */}
                        <Card className="glass-panel border-white/10 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <DollarSign className="w-5 h-5 text-emerald-400" />
                                    {t("finops.title")}
                                </CardTitle>
                                <CardDescription>{t("finops.desc")}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4 relative z-10">
                                <div className="flex justify-between items-end mb-2">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Projeção do Mês</p>
                                        <p className="text-3xl font-bold tracking-tight text-white/90">
                                            ${MOCK_FINOPS_COSTS.projectedMonthTotal.toFixed(2)}
                                        </p>
                                    </div>
                                    {MOCK_FINOPS_COSTS.wasteIdentified > 0 && (
                                        <div className="text-right">
                                            <p className="text-xs text-amber-500 font-semibold mb-1">Cloud Waste Identificado</p>
                                            <Badge variant="destructive" className="bg-amber-500/10 text-amber-500 border-amber-500/20">
                                                ${MOCK_FINOPS_COSTS.wasteIdentified.toFixed(2)} idle
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-2 mt-4">
                                    {MOCK_FINOPS_COSTS.services.slice(0, 3).map(svc => (
                                        <div key={svc.name} className="flex flex-col gap-1.5">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground text-xs">{svc.name}</span>
                                                <span className="font-mono text-xs">${svc.cost}</span>
                                            </div>
                                            <Progress value={svc.percentage} className="h-1.5 bg-white/5" />
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* AppSec Card */}
                        <Card className="glass-panel border-white/10 shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/20 rounded-full blur-3xl -mr-10 -mt-10" />
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldAlert className="w-5 h-5 text-rose-500" />
                                    {t("appsec.title")}
                                </CardTitle>
                                <CardDescription>{t("appsec.desc")}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-16 h-16 rounded-full border-[3px] border-rose-500/30 flex items-center justify-center text-rose-400 font-bold text-2xl shadow-[0_0_15px_rgba(225,29,72,0.2)]">
                                        {MOCK_SECURITY_SCORE.score}
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {MOCK_SECURITY_SCORE.compliance.map(c => (
                                            <Badge key={c} variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                                                <CheckCircle className="w-3 h-3 mr-1" /> {c}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Vulnerabilidades Abertas</p>
                                    {MOCK_SECURITY_SCORE.cves.map(cve => (
                                        <div key={cve.id} className="flex justify-between items-center text-sm p-2 rounded-md bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                            <div className="flex gap-2 items-center">
                                                <AlertTriangle className={cve.severity === 'CRITICAL' ? 'text-rose-500 w-4 h-4' : 'text-amber-500 w-4 h-4'} />
                                                <span className="font-mono text-xs text-white/80">{cve.id}</span>
                                            </div>
                                            <Badge variant="destructive" className="text-[10px] h-5 bg-rose-500/20 text-rose-400 border-rose-500/30">
                                                {cve.severity}
                                            </Badge>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* CI/CD Card */}
                        <Card className="glass-panel border-white/10 shadow-lg">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <TerminalSquare className="w-5 h-5 text-blue-400" />
                                        {t("actions.title")}
                                    </CardTitle>
                                    <CardDescription>{t("actions.desc")}</CardDescription>
                                </div>
                                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/10 rounded-full">
                                    <RefreshCcw className="w-4 h-4 text-muted-foreground" />
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    {MOCK_ACTIONS.map(run => (
                                        <div key={run.id} className="flex items-center justify-between text-sm p-2 rounded border border-white/5 bg-black/20 group hover:border-white/20 transition-all">
                                            <div className="flex items-center gap-3">
                                                {run.status === 'success' ? (
                                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                                ) : (
                                                    <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(225,29,72,0.8)] animate-pulse" />
                                                )}
                                                <div>
                                                    <p className="text-xs font-medium text-white/90">#{run.id} {run.workflow}</p>
                                                    <div className="flex gap-2 items-center text-[10px] text-muted-foreground mt-0.5">
                                                        <span className="flex items-center"><GitBranch className="w-3 h-3 mr-0.5" /> {run.branch}</span>
                                                        <span>•</span>
                                                        <span className="font-mono">{run.commit}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right flex flex-col items-end">
                                                <span className="text-[10px] text-muted-foreground">{run.time}</span>
                                                {run.status === 'failure' && (
                                                    <Button variant="ghost" size="sm" className="h-5 px-2 text-[10px] mt-1 hover:text-white border border-white/10">Re-run</Button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* ITSM - Jira and Service Now Combined */}
                        <Card className="glass-panel border-white/10 lg:col-span-2 xl:col-span-3">
                            <CardHeader>
                                <CardTitle>{t("jira.title")}</CardTitle>
                                <CardDescription>Tickets Ativos & Sprints</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Jira */}
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>
                                            Jira - Active Sprint
                                        </h3>
                                        <div className="space-y-2">
                                            {MOCK_JIRA.map(issue => (
                                                <div key={issue.key} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5 hover:bg-white/10">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="font-mono text-xs font-bold text-blue-400">{issue.key}</span>
                                                            <Badge variant="outline" className="text-[10px] px-1 h-4">{issue.type}</Badge>
                                                        </div>
                                                        <span className="text-sm text-white/80">{issue.title}</span>
                                                    </div>
                                                    <Badge className="bg-white/10 hover:bg-white/20 text-white border border-white/10">{issue.status}</Badge>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* ServiceNow */}
                                    <div>
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-500 block"></span>
                                            ServiceNow - Incidentes Abertos
                                        </h3>
                                        <div className="space-y-2">
                                            {MOCK_SERVICENOW.map(inc => (
                                                <div key={inc.id} className="flex justify-between items-center p-3 rounded bg-white/5 border border-white/5 hover:border-amber-500/30 transition-colors">
                                                    <div className="flex flex-col gap-1">
                                                        <div className="flex gap-2 items-center">
                                                            <span className="font-mono text-xs font-bold text-amber-500">{inc.id}</span>
                                                            <span className="text-[10px] text-muted-foreground">{inc.created}</span>
                                                        </div>
                                                        <span className="text-sm text-white/80 truncate max-w-[200px]">{inc.desc}</span>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1">
                                                        <Badge variant="destructive" className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[10px] uppercase">{inc.priority}</Badge>
                                                        <span className="text-[10px] text-muted-foreground">{inc.state}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                    </div>
                </TabsContent>

                <TabsContent value="value-chain" className="mt-6">
                    <Card className="glass-panel border-white/10 min-h-[400px] flex items-center justify-center">
                        {/* Minimal mockup for React Flow / Value Chain graph */}
                        <div className="flex flex-col items-center">
                            <div className="w-40 h-20 rounded-xl border border-blue-500/50 bg-blue-500/10 flex items-center justify-center font-semibold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                                Domínio: Vendas
                            </div>
                            <div className="w-0.5 h-10 bg-white/20 my-1 relative">
                                <div className="absolute inset-x-0 w-2 h-2 rounded-full bg-white/50 left-[50%] -translate-x-[50%] top-1/2" />
                            </div>

                            <div className="flex gap-10">
                                <div className="flex flex-col items-center">
                                    <div className="w-48 h-16 rounded-lg border border-emerald-500/50 bg-emerald-500/10 flex items-center justify-center text-sm font-medium text-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                        {params.serviceId}
                                    </div>
                                </div>

                                <div className="flex flex-col items-center mt-8">
                                    <div className="w-48 h-16 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-sm font-medium text-white/70">
                                        Payment Gateway
                                    </div>
                                </div>
                            </div>

                            <p className="mt-16 text-muted-foreground text-sm max-w-md text-center">
                                Visualização de Grafo simplificada. Uma implementação real renderizaria <b>React Flow</b> integrando com EdgeDB para modelar as topologias dos times (Squads) e os Contextos Delimitados (Bounded Contexts).
                            </p>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
