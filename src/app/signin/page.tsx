
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const signupSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required." }),
  lastName: z.string().min(1, { message: "Last name is required." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  username: z.string().min(3, { message: "Username must be at least 3 characters." }),
  password: z.string().min(4, { message: "Password must be at least 4 characters." }),
});

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px" {...props}>
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.022,35.222,44,30.032,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
    </svg>
);

const AppleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
        <path d="M12 0C7.31 0 4.163 3.038 4.163 7.15c0 2.47 1.353 4.312 3.434 5.438-2.26 1.282-3.692 3.333-3.692 5.75C3.905 22.094 6.81 24 10.5 24c2.25 0 3.79-.812 5.438-2.313 1.563 1.5 3.063 2.313 5.125 2.313 3.688 0 6.594-1.906 6.594-5.656 0-2.47-1.375-4.407-3.625-5.625C22.625 11.468 24 9.625 24 7.15C24 3.038 20.69 0 16 0c-2.375 0-4.063 1-5.625 2.5C9.06 1 7.375 0 5.031 0H12zm-2.094 2.125c.938.0 1.938.531 2.656 1.25.75-.719 1.719-1.25 2.719-1.25 1.844 0 3.22 1.156 3.22 3.03 0 1.5-1.03 2.407-2.343 2.407-1.28 0-2.25-.875-3.03-2.03-.782 1.155-1.75 2.03-3.032 2.03-1.313 0-2.344-.906-2.344-2.407C4.78 3.28 6.156 2.125 8 2.125h1.906z" />
    </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" {...props}>
        <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
    </svg>
);

export default function SignInPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");

    const loginForm = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: { username: "", password: "" },
    });

    const signupForm = useForm<z.infer<typeof signupSchema>>({
        resolver: zodResolver(signupSchema),
        defaultValues: { firstName: "", lastName: "", email: "", username: "", password: "" },
    });

    function onLoginSubmit(values: z.infer<typeof loginSchema>) {
        if (values.username === "goko" && values.password === "1234") {
            toast({ title: "Successfully logged in!", description: "Welcome back, goko!" });
            router.push("/");
        } else {
            toast({ 
                title: "Login Failed", 
                description: "Invalid username or password. (Hint: goko / 1234)", 
                variant: "destructive" 
            });
        }
    }

    function onSignupSubmit(values: z.infer<typeof signupSchema>) {
        toast({ 
            title: "Account Created Successfully!", 
            description: `Welcome to Gokovia, ${values.firstName}! You can now sign in.` 
        });
        setAuthMode("signin");
        loginForm.setValue("username", values.username);
    }

    function handleSocialClick() {
        toast({
            title: "Coming Soon!",
            description: "Social login features are not yet implemented.",
        })
    }

    return (
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold">Welcome to Gokovia</CardTitle>
                        <CardDescription>
                            {authMode === "signin" ? "Enter your credentials to access your account." : "Fill out the form below to create a new account."}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs value={authMode} onValueChange={(v) => setAuthMode(v as any)} className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="signin">Sign In</TabsTrigger>
                                <TabsTrigger value="signup">Sign Up</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="signin">
                                <Form {...loginForm}>
                                    <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                                        <FormField
                                            control={loginForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl><Input placeholder="e.g. goko" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={loginForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl><Input type="password" placeholder="••••" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign In</Button>
                                    </form>
                                </Form>
                            </TabsContent>

                            <TabsContent value="signup">
                                <Form {...signupForm}>
                                    <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <FormField
                                                control={signupForm.control}
                                                name="firstName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>First Name</FormLabel>
                                                        <FormControl><Input placeholder="John" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={signupForm.control}
                                                name="lastName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Last Name</FormLabel>
                                                        <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                        <FormField
                                            control={signupForm.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email address</FormLabel>
                                                    <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={signupForm.control}
                                            name="username"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl><Input placeholder="Choose a username" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={signupForm.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Password</FormLabel>
                                                    <FormControl><Input type="password" placeholder="••••" {...field} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">Create Account</Button>
                                    </form>
                                </Form>
                            </TabsContent>
                        </Tabs>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">or use one of these options</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3">
                            <Button variant="outline" onClick={handleSocialClick}><GoogleIcon /></Button>
                            <Button variant="outline" onClick={handleSocialClick}><AppleIcon /></Button>
                            <Button variant="outline" onClick={handleSocialClick}><FacebookIcon /></Button>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col items-start text-xs text-muted-foreground pt-6">
                        <p>By signing in or creating an account, you agree with our <Link href="#" className="text-primary hover:underline">Terms & Conditions</Link> and <Link href="#" className="text-primary hover:underline">Privacy Statement</Link></p>
                        <p className="mt-4 text-center w-full">All rights reserved.</p>
                        <p className="text-center w-full">Copyright (2006-2025) – Gokovia.com™</p>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
