import React, { createContext, useContext, ReactNode } from "react";
import { useGetMe, useLogin, useLogout, useRegister } from "@workspace/api-client-react";
import type { User, LoginInput, RegisterInput } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (data: LoginInput) => Promise<void>;
  register: (data: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useGetMe({
    query: {
      retry: false,
    }
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();
  const { toast } = useToast();

  const login = async (data: LoginInput) => {
    try {
      await loginMutation.mutateAsync({ data });
      await refetch();
      toast({
        title: "Connexion réussie",
        description: "Bienvenue !",
      });
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error?.message || "Identifiants invalides",
        variant: "destructive",
      });
      throw error;
    }
  };

  const registerUser = async (data: RegisterInput) => {
    try {
      await registerMutation.mutateAsync({ data });
      await refetch();
      toast({
        title: "Inscription réussie",
        description: "Bienvenue dans la communauté !",
      });
    } catch (error: any) {
      toast({
        title: "Erreur d'inscription",
        description: error?.message || "Une erreur est survenue",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
      await refetch();
      toast({
        title: "Déconnexion",
        description: "À bientôt !",
      });
    } catch (error: any) {
      // ignore
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        register: registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
