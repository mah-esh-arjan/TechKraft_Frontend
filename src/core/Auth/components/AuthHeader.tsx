import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

export const AuthHeader = () => {
  const user = auth.get();

  const logout = () => {
    auth.clear();
    window.location.href = '/listing';
  };

  return (
    <div className="border-b p-4 flex justify-between items-center">
      <Link to="/listing" search={{ page: 1, limit: 10 }} className="text-xl font-semibold">
        Properties
      </Link>
      
      {user ? (
        <div className="flex gap-3 items-center">
          {user.isAdmin && <span className="text-sm">Admin</span>}
          <Button onClick={logout} variant="outline" size="sm">
            Logout
          </Button>
        </div>
      ) : (
        <Link to="/login">
          <Button variant="outline" size="sm">Login</Button>
        </Link>
      )}
    </div>
  );
};
