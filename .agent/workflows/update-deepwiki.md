---
description: How to keep DEEPWIKI.md updated after every code change
---

# Update DEEPWIKI.md

After **every** code change made to the repository, you MUST update the `DEEPWIKI.md` file at the project root to reflect the current state of the codebase.

## What to update

1. **Section 4 (Estrutura de Diretórios):** If files or directories were added, removed, or renamed.
2. **Section 6 (Roteamento):** If new routes were added or existing ones changed in `src/router.tsx`.
3. **Section 8 (Sistema de Plugins):** If new plugins/domains were added or existing ones modified.
4. **Section 9 (Componentes UI):** If new shadcn components were added via `npx shadcn add`.
5. **Section 11 (Camada de Dados):** If mocks were replaced with real API calls or new data sources were added.
6. **Section 13 (Estado Atual e Roadmap):** Move items between ✅/🚧/🔮 as features are implemented.
7. **Section 14 (Referência de Arquivos):** Update the file table with new/removed files and line counts.

## When to update

- After completing each logical unit of work (not every single file edit, but every feature/fix).
- Right before committing, as a final step.

## Rules

- Keep the same document structure and formatting (Mermaid diagrams, tables, etc.).
- Use relative links for files within the repo when possible.
- Update line counts in the reference table.
- Keep the language in Portuguese (pt-BR) to match the existing documentation style.
