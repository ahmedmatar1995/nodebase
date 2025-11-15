"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const registerSchema = z
  .object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(1, "Password is Required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password Don't Match",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const router = useRouter();
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    console.log(values);
    authClient.signUp.email(
      {
        name: values.email,
        email: values.email,
        password: values.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      }
    );
  };

  const isPending = form.formState.isSubmitting;

  return (
    <div className="flex flex-col items-center py-10 gap-6 w-screen min-h-screen">
      <Card className="max-w-full w-2xl rounded">
        <CardHeader className="text-center">
          <CardTitle>Get Started</CardTitle>
          <CardDescription>Create Your Account To Get Started</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
                <div className="flex flex-col gap-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      src="/github.svg"
                      width={20}
                      height={20}
                      alt="Github"
                    />
                    Continue With Github
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    type="button"
                    disabled={isPending}
                  >
                    <Image
                      src="/google.svg"
                      width={20}
                      height={20}
                      alt="Google"
                    />
                    Continue With Google
                  </Button>
                </div>
                <div className="grid gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email:</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                            placeholder="m@example.com"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password:</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ConfirmPassword:</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            {...field}
                            placeholder="******"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full "
                    disabled={isPending}
                  >
                    Sign Up
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already Have An Account?,{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
