import { api } from "@/lib/api";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "jhon",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const { username, password } = credentials;
        const resp = await api.post("/login", { username, password });

        if (resp.status === 401) {
          console.log(
            JSON.parse(
              JSON.stringify(
                { data: resp.data, status: resp.status, text: resp.statusText },
                null,
                2,
              ),
            ),
          );

          return null;
        }
        console.log(resp.data);

        return resp.data;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
