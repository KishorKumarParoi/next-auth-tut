import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GitHub,
    Google,
    // Credentials({
    //   name: "Credentials",
    //   credentials: {
    //     email: { label: "Email", type: "email" },
    //     password: { label: "Password", type: "password" },
    //   },
    //   authorize: async (credentials) => {
    //     const email = credentials.email as string | undefined;
    //     const password = credentials.password as string | undefined;

    //     if (!email || !password) {
    //       throw new CredentialsSignin("Please Provide both email and password");
    //     }

    //     // Replace this with your actual user authentication logic
    //     const user = await getUserByEmailAndPassword(email, password);
    //     console.log("user", user);

    //     if (!user) {
    //       throw new CredentialsSignin("Invalid email or password");
    //     }

    //     if (!user.password) {
    //       throw new CredentialsSignin("Invalid password");
    //     }

    //     const isMatched = await compare(password, user.password);

    //     if (!isMatched) {
    //       throw new CredentialsSignin("Password does not match");
    //     }

    //     // If no error and we have user data, return it
    //     return user;
    //   },
    // }),
  ],
});
