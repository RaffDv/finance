"use client";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Link from "next/link";

const SignInButton = () => {
  const { data: session } = useSession();

  if (session && session.user)
    return (
      <div className="flex ml-auto gap-4">
        <p className="text-sky-600">{session.user.name}</p>
        <Link href={"/api/auth/signout"}>
          <Button variant={"link"} className="flex gap-4 ml-auto text-red-400">
            signOut
          </Button>
        </Link>
      </div>
    );

  return (
    <Link href={"/api/auth/signin"}>
      <Button variant={"secondary"}>SignIn</Button>
    </Link>
  );
};
export default SignInButton;
