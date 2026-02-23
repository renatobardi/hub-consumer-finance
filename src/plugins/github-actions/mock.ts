export const MOCK_ACTIONS = [
    { id: 1042, workflow: "CI/CD Pipeline", status: "success", branch: "main", commit: "a1b2c3d", time: "10m ago", duration: "3m 42s" },
    { id: 1041, workflow: "CI/CD Pipeline", status: "failure", branch: "feat/new-billing", commit: "f4e5d6c", time: "2h ago", duration: "1m 12s" },
    { id: 1040, workflow: "Nightly Security Scan", status: "success", branch: "main", commit: "b9a8c7d", time: "12h ago", duration: "15m 02s" },
    { id: 1039, workflow: "CI/CD Pipeline", status: "success", branch: "main", commit: "9f8e7d6", time: "1d ago", duration: "4m 10s" },
    { id: 1038, workflow: "CI/CD Pipeline", status: "success", branch: "main", commit: "1a2b3c4", time: "2d ago", duration: "3m 55s" }
];

export const MOCK_JIRA = [
    { key: "BIL-3420", type: "Story", title: "Integração com novo Gateway Pix", status: "In Progress", priority: "High" },
    { key: "BIL-3419", type: "Bug", title: "Latência em horários de pico", status: "To Do", priority: "Highest" },
];

export const MOCK_SERVICENOW = [
    { id: "INC0012042", state: "New", priority: "P2", desc: "Banco de dados principal sobrecarregado", created: "1h ago" },
    { id: "INC0012019", state: "In Progress", priority: "P3", desc: "Erro de permissão no bucket S3 de faturas", created: "5h ago" },
];
