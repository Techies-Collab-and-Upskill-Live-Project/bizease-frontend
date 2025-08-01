// lib/auths.ts
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

declare module 'next-auth' {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string;
      refreshToken?: string;
    };
  }

  interface User {
    accessToken?: string;
    refreshToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Sign In',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/login/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            },
          );

          if (!res.ok) return null;

          const data = await res.json();

          return {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            accessToken: data.data.access,
            refreshToken: data.data.refresh,
          };
        } catch (error) {
          console.error('Credentials login error:', error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email && profile?.name) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/accounts/google-login/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: profile.email,
                name: profile.name,
              }),
            },
          );

          if (!res.ok) return false;

          const data = await res.json();

          // Attach backend-issued tokens to account (temporary storage)
          account.accessToken = data.data.access;
          account.refreshToken = data.data.refresh;
        } catch (err) {
          console.error('Google signIn error:', err);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      // From credentials login
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }

      // From Google login
      if (account?.accessToken) {
        token.accessToken = account.accessToken as string;
        token.refreshToken = account.refreshToken as string;
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user && token?.accessToken) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
      }

      return session;
    },

    redirect() {
      return '/dashboard';
    },
  },

  pages: {
    signIn: '/log-in',
  },

  secret: process.env.NEXTAUTH_SECRET,
};
