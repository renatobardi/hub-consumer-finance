import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
    en: {
        translation: {
            "finops.title": "Cloud Costs & Waste",
            "finops.desc": "Financial Projection and Identified Waste",
            "appsec.title": "Security Scorecard",
            "appsec.desc": "Compliance and Vulnerabilities (Snyk/GHAS)",
            "actions.title": "GitHub Actions",
            "actions.desc": "Last 5 pipeline runs",
            "jira.title": "Jira & ServiceNow",
            "jira.desc": "Active Tickets & Sprints",
            "common.sync": "Sync Data",
            "common.openRepo": "Open Repo",
            "tabs.overview": "Tactical Overview",
            "tabs.valueChain": "Value Chain",
        }
    },
    pt: {
        translation: {
            "finops.title": "Cloud Costs & Waste",
            "finops.desc": "Projeção Financeira e Desperdício Identificado",
            "appsec.title": "Security Scorecard",
            "appsec.desc": "Conformidade e Vulnerabilidades (Snyk/GHAS)",
            "actions.title": "GitHub Actions",
            "actions.desc": "Últimas 5 runs do pipeline",
            "jira.title": "Jira & ServiceNow",
            "jira.desc": "Tickets Ativos & Sprints",
            "common.sync": "Sincronizar Dados",
            "common.openRepo": "Abrir Repo",
            "tabs.overview": "Overview Tático",
            "tabs.valuechain": "Cadeia de Valor",
        }
    },
    es: {
        translation: {
            "finops.title": "Costos y Desperdicio en la Nube",
            "finops.desc": "Proyección Financiera y Desperdicio Identificado",
            "appsec.title": "Security Scorecard",
            "appsec.desc": "Cumplimiento e Vulnerabilidades (Snyk/GHAS)",
            "actions.title": "GitHub Actions",
            "actions.desc": "Últimas 5 ejecuciones del pipeline",
            "jira.title": "Jira & ServiceNow",
            "jira.desc": "Tickets Activos y Sprints",
            "common.sync": "Sincronizar Datos",
            "common.openRepo": "Abrir Repo",
            "tabs.overview": "Resumen Táctico",
            "tabs.valueChain": "Cadena de Valor",
        }
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: 'pt', // Idioma padrão
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
