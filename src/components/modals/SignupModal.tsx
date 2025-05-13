import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PayPalButton from "@/components/PayPalButton";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const formSchema = z.object({
  firstName: z.string().min(2, { message: "First name is required" }),
  lastName: z.string().min(2, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  cardNumber: z.string().min(16, { message: "Invalid card number" }).max(19),
  expiryDate: z.string().regex(/^\d{2}\/\d{2}$/, { message: "Invalid expiry date (MM/YY)" }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "Invalid CVC" }),
  termsAccepted: z.boolean().refine(val => val === true, { message: "You must accept the terms" })
});

type FormValues = z.infer<typeof formSchema>;

const SignupModal = ({ isOpen, onClose }: SignupModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cardNumber: "",
      expiryDate: "",
      cvc: "",
      termsAccepted: false
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // In a real app, we would process the payment here
      toast({
        title: "Subscription started",
        description: "Your 30-day free trial has begun",
      });
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "Please try again later",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Start Your 30-Day Free Trial</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel>Create Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Minimum 8 characters" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between mb-4">
                  <h4 className="font-medium text-gray-800">Payment Method</h4>
                  <div className="flex space-x-4">
                    <Button 
                      type="button" 
                      variant={paymentMethod === 'card' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod('card')}
                    >
                      <i className="far fa-credit-card mr-2"></i>
                      Card
                    </Button>
                    <Button 
                      type="button" 
                      variant={paymentMethod === 'paypal' ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPaymentMethod('paypal')}
                    >
                      <i className="fab fa-paypal mr-2"></i>
                      PayPal
                    </Button>
                  </div>
                </div>
                
                {paymentMethod === 'card' ? (
                  <>
                    <FormField
                      control={form.control}
                      name="cardNumber"
                      render={({ field }) => (
                        <FormItem className="space-y-2 mb-4">
                          <FormLabel>Card Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-1">
                                <i className="fab fa-cc-visa text-blue-700"></i>
                                <i className="fab fa-cc-mastercard text-red-500"></i>
                                <i className="fab fa-cc-amex text-blue-500"></i>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="expiryDate"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>Expiry Date</FormLabel>
                            <FormControl>
                              <Input placeholder="MM/YY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="cvc"
                        render={({ field }) => (
                          <FormItem className="space-y-2">
                            <FormLabel>CVC</FormLabel>
                            <FormControl>
                              <Input placeholder="123" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <div className="py-4 flex justify-center">
                    <PayPalButton 
                      amount="49.00"
                      currency="USD" 
                      intent="CAPTURE"
                    />
                  </div>
                )}
              </div>
            </div>
            
            <div className="pt-4">
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Pro Plan - Monthly</span>
                  <span className="text-gray-700">$49.00</span>
                </div>
                <div className="flex justify-between text-green-600 font-medium">
                  <span>Free Trial Discount</span>
                  <span>-$49.00</span>
                </div>
                <div className="border-t border-gray-200 my-2 pt-2">
                  <div className="flex justify-between font-bold">
                    <span>Today's Total</span>
                    <span>$0.00</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-medium">
                    Then $49.00/month after 30 days
                  </div>
                  <div className="text-xs text-amber-600 mt-2 p-2 border border-amber-200 bg-amber-50 rounded-md">
                    <i className="fas fa-exclamation-circle mr-1"></i>
                    By entering your card details, you agree to automatic renewal. Your subscription will automatically renew at $49.00/month after your free trial ends.
                  </div>
                </div>
              </div>
              
              {paymentMethod === 'card' && (
                <div className="mb-6">
                  <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm text-gray-600">
                            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>. I understand my card will be charged $49/month after the 30-day free trial unless I cancel.
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              )}
              
              {paymentMethod === 'card' ? (
                <Button 
                  type="submit" 
                  disabled={form.formState.isSubmitting}
                  className="w-full text-lg font-medium px-8 py-4 rounded-xl shadow-lg hover:bg-primary/90 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg flex items-center justify-center"
                >
                  {form.formState.isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <span>Start My Free Trial</span>
                  )}
                </Button>
              ) : (
                <div className="text-center text-sm text-gray-500">
                  Click the PayPal button above to complete your subscription
                </div>
              )}
              
              <div className="flex items-center justify-center mt-4">
                <i className="fas fa-shield-alt text-gray-400 mr-2"></i>
                <span className="text-sm text-gray-500">Secure checkout powered by {paymentMethod === 'paypal' ? 'PayPal' : 'Stripe'}</span>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
