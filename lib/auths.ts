// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';

// export const authConfig: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: 'Sign In',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'email',
//           placeholder: 'Enter your email here',
//         },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials) {
//         if (!credentials || !credentials.email || !credentials.password) {
//           return null;
//         }

//         try {
//           console.log('received email payload', credentials);
//           console.log(
//             `${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`,
//           );

//           const res = await fetch(
//             `${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`,
//             {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 email: credentials.email,
//                 password: credentials.password,
//               }),
//             },
//           );

//           if (!res.ok) {
//             const errorText = await res.text();
//             console.error('Login failed:', res.status, errorText);
//             return null;
//           }

//           // if (!res.ok) return null;

//           const data = await res.json();

//           console.log('received credentials', res);
//           console.log('received data', data);

//           // Return a user object with tokens (this is passed to JWT callback)
//           return {
//             id: data.user.id,
//             email: data.user.email,
//             name: data.user.name,
//             accessToken: data.data.access,
//             refreshToken: data.data.refresh,
//           };
//         } catch (error) {
//           console.error('Login error:', error);
//           return null;
//         }
//       },
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//   ],
//   secret: process.env.NEXT_AUTH_SECRET,
//   session: {
//     strategy: 'jwt',
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.accessToken = token.accessToken;
//         session.refreshToken = token.refreshToken;
//       }
//       return session;
//     },
//   },
// };
import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

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
            `${process.env.NEXT_PUBLIC_BASE_URL}accounts/login/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            },
          );

          if (!res.ok) {
            const errorText = await res.text();
            console.error('Login failed:', res.status, errorText);
            return null;
          }

          const data = await res.json();

          return {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
            accessToken: data.data.access,
            refreshToken: data.data.refresh,
          };
        } catch (error) {
          console.error('Login error:', error);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      console.log(account, token, user, 'items being sent to API');

      // If logging in via Google
      if (account?.provider === 'google' && profile?.email && profile?.name) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}accounts/google-login/`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: profile.email,
                name: profile.name,
              }),
            },
          );

          if (res.ok) {
            const data = await res.json();
            token.accessToken = data.data.access;
            token.refreshToken = data.data.refresh;
          } else {
            const errText = await res.text();
            console.error('Google login backend error:', res.status, errText);
          }
        } catch (err) {
          console.error('Google login exception:', err);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
      }
      return session;
    },

    async redirect({ baseUrl }) {
      // Always redirect to dashboard after login
      return `${baseUrl}/dashboard`;
    },
  },

  pages: {
    signIn: '/log-in', // Custom login page
  },

  secret: process.env.NEXT_AUTH_SECRET,
};
