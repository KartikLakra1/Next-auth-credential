"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Page = () => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  /*const handleInputChange = (event : any) => {
    const {name , value} = event.target;
    return setUser((prevInfo) => ({...prevInfo , [name] : value}));
  }
  */

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setloading(true);
    console.log(user);

    try {
      if (!user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(user.email)) {
        setError("Invalid email id");
        return;
      }
      const res = await signIn("credentials", {
        email: user.email,
        password: user.password,
        redirect: false,
      });

      if (res?.error) {
        console.log(res);
        setError("error");
      }

      console.log(res?.status);
      console.log(res?.ok);

      if (!res?.ok) {
        setError("user not registered");
        router.push("/signup");
      } else {
        setError("");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("");
      setloading(false);
    } finally {
      setUser({
        email: "",
        password: "",
      });
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>This is the Login form</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Email"
              type="email"
              name="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <Input
              placeholder="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <div className="mt-2 mb-2 text-red-500">{error}</div>

            <Button type="submit">
              {loading ? "Processing...." : "Login"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <div className="flex flex-col gap-4">
            <Button variant="destructive" onClick={() => signIn("google")}>
              Login with google
            </Button>
          </div>
          <Link href={"/signup"}>Don't have an account? signUp</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

// 35:21
