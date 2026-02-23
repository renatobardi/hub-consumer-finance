import { createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { AppLayout } from '@/components/layout/app-layout';
import { ServiceDetail } from '@/plugins/finops/components/service-detail';

const rootRoute = createRootRoute({
    component: AppLayout,
});

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: function Index() {
        return (
            <div className="p-6">
                <h1 className="text-3xl font-bold mb-4">Command Center</h1>
                <p className="text-muted-foreground">Bem-vindo ao HUB Consumer Finance. Use o atalho Cmd+K para navegar.</p>
                <p className="mt-4">Por favor, acesse os detalhes de serviço no menu lateral ou navegue para <code>/service/core-billing</code>.</p>
            </div>
        );
    },
});

const serviceRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/service/$serviceId',
    component: ServiceDetail,
});

const routeTree = rootRoute.addChildren([indexRoute, serviceRoute]);

export const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
