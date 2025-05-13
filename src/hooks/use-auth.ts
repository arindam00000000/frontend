import { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import { 
  loginWithEmail, 
  signupWithEmail, 
  loginWithGoogle, 
  signOut as authSignOut, 
  getCurrentUser 
} from "@/lib/auth";

export function useAuth() {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
}

export function useProvideAuth() {
  const [user, setUser] = useState<any>(null);
  const [isPro, setIsPro] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        // Check if user is Pro
        if (currentUser?.uid) {
          // In a real app, you would fetch this from your backend
          setIsPro(false);
        }
      } catch (error) {
        console.error("Auth state error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    unsubscribe();
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await loginWithEmail(email, password);
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signUp = useCallback(async (username: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      const user = await signupWithEmail(username, email, password);
      setUser(user);
      return user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    try {
      setIsLoading(true);
      return await loginWithGoogle();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await authSignOut();
      setUser(null);
      setIsPro(false);
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "Please try again",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    user,
    isPro,
    isLoading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
  };
}
