"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { passwordMatchSchema } from "@/validation/passwordMatchSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { udpatePassword } from "./action";
import Link from "next/link";

const formSchema = passwordMatchSchema;

type UpdatePasswordProps = {
  token: string;
};

function UpdatePasswordForm({ token }: UpdatePasswordProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof formSchema>) => {
    const response = await udpatePassword({
      token,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    });

    if (response?.tokenInvalid) {
      window.location.reload();
    }

    if (response?.error) {
      form.setError("root", {
        message: response.message,
      });
    } else {
      toast({
        title: "Password Changed",
        description: "Your password has been updated.",
        className: "bg-green-500 text-white",
      });
      form.reset();
    }
  };

  return form.formState.isSubmitSuccessful ? (
    <div>
      Your password has been updated.{" "}
      <Link className="underline" href="/login">
        Click here to login to your account
      </Link>
    </div>
  ) : (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <fieldset
          className="flex flex-col gap-2"
          disabled={form.formState.isSubmitting}
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password Confirm</FormLabel>
                <FormControl>
                  <Input {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {!!form?.formState?.errors?.root?.message && (
            <FormMessage>{form.formState.errors.root.message}</FormMessage>
          )}
          <Button type="submit">Update Password</Button>
        </fieldset>
      </form>
    </Form>
  );
}

export default UpdatePasswordForm;
