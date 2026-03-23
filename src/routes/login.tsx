import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '@/core/Auth/components/LoginForm';

export const Route = createFileRoute('/login')({
  component: LoginForm,
});
