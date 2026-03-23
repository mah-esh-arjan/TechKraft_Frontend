import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  beforeLoad: () => {
    throw redirect({
      to: '/listing',
      search: {
        page: 1,
        limit: 10
      }
    })
  },
})
