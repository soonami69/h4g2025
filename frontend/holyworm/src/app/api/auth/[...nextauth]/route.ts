import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
