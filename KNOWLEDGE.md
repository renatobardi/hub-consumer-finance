# Knowledge Base: HUB Consumer Finance

## Visão Geral do Projeto
O **HUB Consumer Finance** é um *Internal Developer Portal* (IDP) ou um "Command Center" focado em centralizar e dar visibilidade sobre métricas vitais de engenharia, infraestrutura e gestão para os times (squads) de desenvolvimento. O projeto tem como objetivo agregar informações de diferentes domínios sobre os microsserviços do ecossistema de Finanças e Vendas.

A aplicação atua como um agregador tático para times de Produto e Engenharia operarem seus serviços com visão completa de custos, segurança, ciclo de vida e incidentes.

---

## 🛠️ Stack Tecnológica
A arquitetura do front-end é uma Single Page Application (SPA) embutida em uma rota "catch-all" do Next.js.
- **Framework Principal:** Next.js 15.5 (usando Turbopack para dev e build).
- **Roteamento & Estado:** `@tanstack/react-router` (para o roteamento client-side) e `@tanstack/react-query` (para consumo de dados assíncronos).
- **Estilização & UI:** TailwindCSS v4, Radix UI e componentes visuais baseados no ecosistema `shadcn`. O tema suporte light/dark mode com `next-themes`.
- **Animações e Ícones:** `framer-motion` e `lucide-react`.
- **Banco de Dados (Previsto):** `edgedb` para modelagem grafo-relacional de topologias de times e dependências entre serviços (Cadeia de Valor).
- **Diagramas (Previsto):** `@xyflow/react` para visualização da arquitetura e cadeia de valor.

---

## 🏛️ Estrutura do Projeto e Arquitetura

O projeto está estruturado em uma Rápida Abordagem Modular via "Plugins", refletindo os diferentes domínios que o HUB atende.

### Diretórios Principais:
- `/src/app/[[...slug]]/page.tsx`: Inicializa a SPA cliente. Desabilita as rotas clássicas do Next.js e injeta o `RouterProvider` e `QueryClientProvider` do TanStack.
- `/src/router.tsx`: Define a árvore de rotas da aplicação (`/` para a Home, `/service/$serviceId` para os detalhes do serviço).
- `/src/components`: Guarda os componentes compartilhados, o layout global (`AppLayout`, `Sidebar`, menu de comandos/Cmd+K) e a base de UI do shadcn (`/ui`).
- `/src/plugins`: Onde a regra de negócios específica de integração mora. Dividido em domínios:
  - `appsec` (Segurança da Aplicação)
  - `finops` (Operações Financeiras e Cloud)
  - `github-actions` (CI/CD)

---

## 🧩 Funcionalidades (Plugins / Domínios)

A página principal de detalhe do serviço (`ServiceDetail` em `/src/plugins/finops/components/service-detail.tsx`) exibe um **Overview Tático** com abas de divisão, que carregam cards específicos de cada domínio:

1. **FinOps (Custos de Nuvem & Desperdício)**
   - Mostra projeções de custos mensais do serviço.
   - Identifica "Cloud Waste" (recursos ociosos) para cortar custos.
   - Detalhamento percentual de gastos dos submódulos/componentes da nuvem.

2. **AppSec (Security Scorecard)**
   - Integra-se virtualmente com Snyk e GitHub Advanced Security (GHAS).
   - Apresenta um Score numérico de segurança.
   - Lista conformidades (ex: SOC2, PCI) e vulnerabilidades ativas (CVEs).

3. **CI/CD (GitHub Actions)**
   - Exibe o histórico das últimas execuções de pipeline.
   - Detalha status, hashes de commit, nome da *branch*, tempo de build e opção de *re-run*.

4. **ITSM (Governança e Incidentes)**
   - **Jira:** Exibe o Sprint ativo, apontando os *Issues* sendo trabalhados e seus status.
   - **ServiceNow:** Mostra os incidentes de produção em aberto para cruzamento com instabilidades.

5. **Cadeia de Valor (Arquitetura Gráfica)**
   - Localizada em uma tab separada.
   - Pretende usar o `React Flow` e o `EdgeDB` para plotar as dependências do microsserviço no escopo macro da empresa (*Bounded Contexts*), mostrando de quem o serviço depende e quem depende dele.

---

## 💡 Observações para o Desenvolvimento Local
1. Como o projeto usa os hooks iterativos via `@tanstack` dentro do Next.js `use client`, atenção para garantir que nada sensível do lado do servidor trafegue para o cliente acidentalmente.
2. A aplicação faz uso intensivo de *mocks* atualmente (`mock.ts` em cada pasta de plugin), desenhados para serem substituídos futuramente por chamadas de API reais através do React Query.
3. Para atuar no visual, atente-se ao uso das classes de utilitários `glass-panel` que conferem a estética translúcida (glassmorfismo) da aplicação.
