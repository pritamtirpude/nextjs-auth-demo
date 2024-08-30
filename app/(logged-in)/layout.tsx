import Link from "next/link";
import React from "react";
import LogoutButton from "./logout-button";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function LoggedInLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex items-center justify-between bg-gray-200 p-4">
        <ul className="flex gap-4">
          <li>
            <Link href="/my-account">My Account</Link>
          </li>
          <li>
            <Link href="/change-password">Change Password</Link>
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <div className="flex flex-1 items-center justify-center">{children}</div>
    </div>
  );
}

export default LoggedInLayout;
