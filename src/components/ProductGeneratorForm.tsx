import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { productGeneratorSchema, type ProductGeneratorInput } from "@shared/schema";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { useLocation } from "wouter";

interface ProductGeneratorFormProps {
  onSuccess: (data: any) => void;
}

const ProductGeneratorForm = ({ onSuccess }: ProductGeneratorFormProps) => {
  const { toast } = useToast();
  const { user, isPro } = useAuth();
  const [location, navigate] = useLocation();
  const [showSignupModal, setShowSignupModal] = useState(false);
  
  const form = useForm<ProductGeneratorInput>({
    resolver: zodResolver(productGeneratorSchema),
    defaultValues: {
      niche: "",
      platform: "",
      followers: 0,
      engagement: 0,
      description: "",
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: ProductGeneratorInput) => {
      const response = await apiRequest("POST", "/api/product-ideas/generate", data);
      return response.json();
    },
    onSuccess: (data) => {
      onSuccess(data);
      form.reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to generate product idea",
        description: error instanceof Error ? error.message : "Please try again later",
      });
    },
  });

  const onSubmit = (data: ProductGeneratorInput) => {
    // Check if user is logged in and has pro subscription
    if (!user || !isPro) {
      toast({
        title: "Pro Subscription Required",
        description: "You need a Pro subscription to generate product ideas.",
        variant: "destructive"
      });
      
      // Redirect to subscription page or show signup modal
      if (!user) {
        navigate("/login?redirect=generator");
      } else {
        navigate("/pricing");
      }
      return;
    }
    
    // User is pro, proceed with generation
    mutate(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="niche"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium text-gray-800">Your Content Niche</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Fitness, Marketing, Beauty, Tech" 
                    {...field}
                    className="py-6 px-4 text-base rounded-lg" 
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="platform"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium text-gray-800">Primary Platform</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="py-6 px-4 text-base rounded-lg">
                      <SelectValue placeholder="Select your main platform" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="tiktok">TikTok</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                    <SelectItem value="twitch">Twitch</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="followers"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium text-gray-800">Follower Count</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 10000" 
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                      field.onChange(value);
                    }}
                    className="py-6 px-4 text-base rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="engagement"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="text-base font-medium text-gray-800">Average Engagement</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    placeholder="e.g., 500 likes/comments per post" 
                    value={field.value === 0 ? '' : field.value}
                    onChange={(e) => {
                      const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                      field.onChange(value);
                    }}
                    className="py-6 px-4 text-base rounded-lg"
                  />
                </FormControl>
                <FormMessage className="text-sm" />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel className="text-base font-medium text-gray-800">Describe Your Content (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What topics do you cover? What's your unique angle?"
                  rows={4}
                  {...field}
                  className="p-4 text-base rounded-lg resize-none"
                />
              </FormControl>
              <FormMessage className="text-sm" />
            </FormItem>
          )}
        />
        
        <div className="pt-8">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full text-lg font-medium px-8 py-7 rounded-xl bg-gradient-to-r from-primary to-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                <span className="text-lg">Generating Your AI Product Ideas...</span>
              </>
            ) : (
              <>
                <i className="fas fa-magic mr-3 text-xl"></i>
                <span className="text-lg">Generate My Product Now</span>
              </>
            )}
          </Button>
          <p className="text-center text-gray-500 text-sm mt-4">
            <i className="fas fa-lock mr-1"></i> Your data is secure and never shared with third parties
          </p>
        </div>
      </form>
    </Form>
  );
};

export default ProductGeneratorForm;
