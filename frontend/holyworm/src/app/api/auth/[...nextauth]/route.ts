import  NextAuth, { DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// debugging for accessToken
declare module 'next-auth' {
    interface Session extends DefaultSession {
      accessToken: string;
      refreshToken: string;
    }
  }

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            authorization: {
                params: {
                  // Request additional scopes required for Gmail API
                  scope: "openid email profile https://www.googleapis.com/auth/gmail.readonly",
                },
              },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        error: "/api/auth/error", // Custom error page
    },
    callbacks: {
        
        async jwt({ token, account }) {
            if (account) {
              token.accessToken = account.access_token;
              token.refreshToken = account.refresh_token; // might not need
            }
            return token;
          },
          async session({ session, token }) {
            session.accessToken = token.accessToken as string;
            return session;
          },
          async redirect({ url, baseUrl }) {
            /*
            // After successful login, redirect to the dashboard
            if (url.startsWith(baseUrl)) {
                return baseUrl; // Redirect to home
            }
            */
            return `${baseUrl}/dashboard`; // Redirect to the dashboard
        },
    },
    debug: true, // Enable debug logging
});

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };
