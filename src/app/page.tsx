"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="lg:text-4xl text-center font-bold p-4 text-xl">
        Hello welcome to next auth project
      </h1>
      <div className="bg-neutral-950 rounded-lg text-white min-h-[50vh] w-[100%] flex flex-col justify-start items-center p-2 m-3 mx-auto">
        <h1 className="text-3xl mt-6 font-bold ">WELCOME</h1>
        <br />
        <div className="flex flex-col text-center">
          {session && (
            <div>
              <h1>{session.user?.name}</h1>
              <h1>{session.user?.email}</h1>
              <h1 className="text-xs lg:text:md mt-11">
                expires in : {session.expires}
              </h1>
              <div className="p-3 m-2 text-center flex items-center justify-center ">
                {session.user?.image ? (
                  <>
                    <img
                      className="bg-white p-3 rounded-md"
                      src={session.user.image}
                      alt="profile-image"
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <button
        onClick={() => {
          signOut();
        }}
        className="border-neutral-950 border-4 bg-slate-400 p-3 font-bold rounded-md ">
        LOGOUT
      </button>
    </main>
  );
}
