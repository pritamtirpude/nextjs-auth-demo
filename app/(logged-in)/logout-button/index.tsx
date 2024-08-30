"use client";

import { Button } from "@/components/ui/button";
import { logoutUser } from "./action";

function LogoutButton() {
  return (
    <Button size="sm" onClick={async () => await logoutUser()}>
      Logout
    </Button>
  );
}

export default LogoutButton;
