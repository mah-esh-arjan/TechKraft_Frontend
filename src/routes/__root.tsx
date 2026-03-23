import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { AuthHeader } from '@/core/Auth/components/AuthHeader'

export const Route = createRootRoute({
  component: () => (
    <>
      <AuthHeader />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})
