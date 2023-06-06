import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({

    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/login',
        verifyRequest: '/login',
        newUser: '/registro',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: { },
            async authorize(credentials, req) {
                const { username, password } = credentials
                const user = { id: "1", name: "johnfdz", email: "jsmith@example.com" }


                if (user.name === username) {
                    // Any object returned will be saved in `user` property of the JWT
                    return user
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),

    ],
    session: {
        jwt: true,
    },
    jwt: {
        secret: 'jnwijnviwjviw',
    },

});