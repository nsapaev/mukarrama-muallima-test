"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/shared/store/auth-store";

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
import { FormValues, formSchema } from "./helper";

export function LoginModule() {
  const login = useAuthStore((s) => s.login);
  const { push } = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (value: FormValues) => {
    const ok = login(value.username, value.password);

    if (!ok) {
      form.setError("root", {
        type: "manual",
        message: "Неверный email или пароль",
      });
      return;
    }

    push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="border border-gray-200 rounded-xl p-6 w-full max-w-sm bg-white shadow-smd">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root?.message && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
