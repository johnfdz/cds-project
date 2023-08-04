import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({

    pages: {
        signIn: '/login',
        signOut: '/login',
        error: '/noAccessPage',
        //verifyRequest: '/login',
        newUser: '/registro',
    },
    providers: [
        CredentialsProvider({
            type: 'credentials',
            credentials: {},
            async authorize(credentials, req) {
                const { username, password } = credentials
                const user = await fetch(`${process.env.URL}/api/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                })
                    .then(res => res.json())
                    .catch(err => console.log(err))

                console.log(user.usuario[0])
                if (user.message === 'success') {
                    // Any object returned will be saved in `user` property of the JWT
                    return user.usuario[0]
                } else {
                    // If you return null then an error will be displayed advising the user to check their details.
                    return null

                    // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
                }
            }
        }),
    ],
    session: {
        jwt: true,
    },
    jwt: {
        secret: process.env.SECRET_KEY,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
                token.username = user.username
                token.id = user.id
                token.name = user.name
            }
            return token
        },
        async session({ session, token }) {
            session.user.name = token.name
            session.user.id = token.id
            session.user.username = token.username
            session.user.role = token.role
            
            return session
        },
        redirect({ url, baseUrl }) {
            return url
        }
    },
});