import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            const isAllowedToSignIn =
                user.email === "humbertoxjunior@gmail.com";
            if (isAllowedToSignIn) {
                return true;
            } else {
                // Return false to display a default error message
                return false;
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        async jwt({ token, user, session, trigger }) {
        },
    },
};

export async function generateStaticParams() {
    // console.log("->RUN 1");
    // const mangas = await fetch(process.env.DOMAIN + "/api/manga?all=true").then(
    //     (res) => res.json()
    // );
    // return mangas.message.map((manga) => ({
    //     id: manga.id.toString(),
    // }));
} 