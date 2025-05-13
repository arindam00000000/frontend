import { auth, googleProvider, signInWithRedirect, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "./firebase";
import { getRedirectResult, signOut as firebaseSignOut, onAuthStateChanged, User } from "firebase/auth";
import { apiRequest } from "./queryClient";

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Use token to authenticate with our backend
    await apiRequest("POST", "/api/auth/login", { token });
    
    return userCredential.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const signupWithEmail = async (username: string, email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    
    // Register with our backend
    await apiRequest("POST", "/api/auth/register", { 
      token,
      username,
      email,
    });
    
    return userCredential.user;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    return signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Google login failed:", error);
    throw error;
  }
};

export const handleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const token = await result.user.getIdToken();
      
      // Register or login with our backend
      await apiRequest("POST", "/api/auth/google", { token });
      
      return result.user;
    }
    return null;
  } catch (error) {
    console.error("Failed to process redirect:", error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await apiRequest("POST", "/api/auth/logout", {});
    return firebaseSignOut(auth);
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
  });
};
