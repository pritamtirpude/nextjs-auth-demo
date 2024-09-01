import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import db from "@/db/drizzle";
import { passwordResetTokens } from "@/db/passwordResetTokenSchema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import UpdatePasswordForm from "./update-password-form";

async function UpdatePasswordPage({
  searchParams,
}: {
  searchParams: {
    token?: string;
  };
}) {
  let tokenIsValid = false;

  const { token } = searchParams;

  if (token) {
    const [passwordResetToken] = await db
      .select()
      .from(passwordResetTokens)
      .where(eq(passwordResetTokens.token, token));

    const now = Date.now();

    if (
      !!passwordResetToken?.tokenExpiry &&
      now < passwordResetToken.tokenExpiry?.getTime()
    ) {
      tokenIsValid = true;
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            {tokenIsValid
              ? "Update password"
              : "Your password reset link is invalid or has expired"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid ? (
            <UpdatePasswordForm token={token ?? ""} />
          ) : (
            <Link className="underline" href="/password-reset">
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

export default UpdatePasswordPage;
