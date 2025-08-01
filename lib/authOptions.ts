// import GoogleProvider from 'next-auth/providers/google';
// import { NextAuthOptions } from 'next-auth';
// import { gmailLogin } from '@/lib/services/gmailLogin'; // adjust path if needed
// import { DefaultUser } from 'next-auth';

// declare module 'next-auth' {
//   interface Session {
//     user: DefaultUser;
//     accessToken?: string;
//     refreshToken?: string;
//   }

//   interface User extends DefaultUser {
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

// declare module 'next-auth/jwt' {
//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, profile }) {
//       if (!profile?.email || !profile?.name) return false;

//       try {
//         // Authenticate with your external backend
//         const { access_token, refresh_token } = await gmailLogin({
//           email: profile.email,
//           name: profile.name,
//         });

//         // Pass to JWT callback
//         user.accessToken = access_token;
//         user.refreshToken = refresh_token;

//         return true;
//       } catch (error) {
//         console.error('❌ External Gmail login failed:', error);
//         return false;
//       }
//     },

//     async jwt({ token, user }) {
//       if (user?.accessToken) {
//         token.accessToken = user.accessToken;
//         token.refreshToken = user.refreshToken;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (token?.accessToken) {
//         session.accessToken = token.accessToken;
//         session.refreshToken = token.refreshToken;
//       }
//       return session;
//     },
//   },
//   session: {
//     strategy: 'jwt', // we use JWT for session storage
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };
