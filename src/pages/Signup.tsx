import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { signupSchema, type SignupInput } from "@shared/schema";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { handleRedirectResult } from "@/lib/auth";

const Signup = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  const { user, signUp, signInWithGoogle, isLoading: authLoading } = useAuth();
  const [redirectLoading, setRedirectLoading] = useState(true);

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  // Handle Google redirect result
  useEffect(() => {
    const checkRedirectResult = async () => {
      try {
        const result = await handleRedirectResult();
        if (result) {
          toast({
            title: "Account created",
            description: "Welcome to AutoProduct AI!",
          });
          navigate("/dashboard");
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Signup failed",
          description: error instanceof Error ? error.message : "Please try again",
        });
      } finally {
        setRedirectLoading(false);
      }
    };

    checkRedirectResult();
  }, []);

  // Redirect if user is already logged in
  useEffect(() => {
    if (user && !redirectLoading) {
      navigate("/dashboard");
    }
  }, [user, redirectLoading]);

  const onSubmit = async (data: SignupInput) => {
    try {
      await signUp(data.username, data.email, data.password);
      toast({
        title: "Account created",
        description: "Welcome to AutoProduct AI!",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Signup failed",
        description: error instanceof Error ? error.message : "Please try a different email or username",
      });
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      // No toast here as we'll be redirected
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Google signup failed",
        description: error instanceof Error ? error.message : "Please try again",
      });
    }
  };

  if (authLoading || redirectLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
            <CardDescription className="text-center">
              Sign up to AutoProduct AI to get started
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleGoogleSignUp}
              disabled={form.formState.isSubmitting}
            >
              <i className="fab fa-google mr-2"></i>
              Sign up with Google
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input placeholder="johndoe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="you@example.com" {...field} />
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
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    'Create Account'
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </div>
            <div className="text-xs text-center text-gray-500">
              By creating an account, you agree to our{" "}
              <a href="#" className="hover:underline">Terms of Service</a>{" "}
              and{" "}
              <a href="#" className="hover:underline">Privacy Policy</a>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
