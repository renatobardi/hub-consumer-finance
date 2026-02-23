export const MOCK_SECURITY_SCORE = {
    score: "A-",
    compliance: ["SOC2", "ISO27001", "PCI-DSS"],
    cves: [
        { id: "CVE-2023-44487", severity: "CRITICAL", title: "HTTP/2 Rapid Reset Attack", status: "Open", since: "2023-10-10" },
        { id: "CVE-2024-12345", severity: "HIGH", title: "Lodash Prototype Pollution", status: "In Progress", since: "2024-01-12" },
        { id: "CVE-2024-67890", severity: "MEDIUM", title: "React XSS Vulnerability", status: "Resolved", since: "2024-02-05" },
    ]
};
