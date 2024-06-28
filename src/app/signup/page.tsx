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
    name: "",
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
      if (!user.name || !user.email || !user.password) {
        setError("please fill all the fields");
        return;
      }

      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(user.email)) {
        setError("Invalid email id");
        return;
      }

      const res = await axios.post("/api/register", user);
      console.log(res.data);

      if (res.status == 200 || res.status == 201) {
        console.log("user added successfully");
        setError("");
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError("");
      setloading(false);
    } finally {
      setUser({
        name: "",
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
          <CardTitle>Sign Up</CardTitle>
          <CardDescription>This is the Sign up form</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Name"
              type="text"
              name="name"
              value={user.name}
              onChange={(e) => setUser({ ...user, name: e.target.value })}
            />
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
              {loading ? "Processing...." : "Register"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <span>or</span>
          <div onClick={() => signIn("google")} className="flex flex-col gap-4">
            <Button variant="destructive">Login with google</Button>
          </div>
          <Link href={"/login"}>Don't have an account? login</Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Page;

// 35:21
