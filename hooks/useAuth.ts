/* eslint-disable react-hooks/set-state-in-effect */
// /* eslint-disable react-hooks/set-state-in-effect */
// 'use client';

// import { useState, useEffect } from 'react';

// interface User {
//   id: string;
//   email: string;
//   name: string;
//   avatar?: string | null;
// }

// export function useAuth() {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Check if user is logged in from localStorage or API
//     const storedUser = localStorage.getItem('user');
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch {
//         setUser(null);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const login = (userData: User) => {
//     setUser(userData);
//     localStorage.setItem('user', JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem('user');
//   };

//   return {
//     user,
//     isLoading,
//     login,
//     logout,
//     isAuthenticated: !!user,
//   };
// }



'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string | null;
}

export function useAuth() {
  const { data: session, status } = useSession();
  const [localUser, setLocalUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setLocalUser(JSON.parse(storedUser));
      } catch {
        setLocalUser(null);
      }
    }
    if (status !== 'loading') setIsLoading(false);
  }, [status]);

  // Google login → session থেকে, Email login → localStorage থেকে
  const user: User | null = session?.user
    ? {
        id: session.user.email ?? '',
        email: session.user.email ?? '',
        name: session.user.name ?? '',
        avatar: session.user.image ?? null,
      }
    : localUser;

  const login = (userData: User) => {
    setLocalUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setLocalUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    if (session) signOut({ callbackUrl: '/login' });
  };

  return {
    user,
    isLoading: isLoading || status === 'loading',
    login,
    logout,
    isAuthenticated: !!user,
  };
}