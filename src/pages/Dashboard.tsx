import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductModal from "@/components/modals/ProductModal";
import { Loader2, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";

const Dashboard = () => {
  const { user, isPro } = useAuth();
  const [location, navigate] = useLocation();
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);

  // Fetch saved product ideas
  const { data: productIdeas, isLoading } = useQuery({
    queryKey: ["/api/product-ideas"],
    enabled: !!user,
  });

  const viewProductIdea = (product: any) => {
    setSelectedProduct(product);
    setProductModalOpen(true);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Card className="w-full max-w-md mx-4">
            <CardContent className="pt-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">Login Required</h1>
                <p className="mb-6">Please login to access your dashboard</p>
                <Button onClick={() => navigate("/login")} className="w-full">
                  Go to Login
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Your Dashboard</h1>
              <p className="text-gray-600">
                Welcome back! {isPro ? "You're on the Pro plan." : "You're on the Free plan."}
              </p>
            </div>
            
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/#try-it">
                  <Plus className="mr-2 h-4 w-4" />
                  New Product Idea
                </Link>
              </Button>
              
              {!isPro && (
                <Button variant="outline" asChild>
                  <Link href="/#pricing">
                    Upgrade to Pro
                  </Link>
                </Button>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="saved" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="saved">Saved Product Ideas</TabsTrigger>
              <TabsTrigger value="account">Account Settings</TabsTrigger>
              {isPro && <TabsTrigger value="subscription">Subscription</TabsTrigger>}
            </TabsList>
            
            <TabsContent value="saved">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : productIdeas && productIdeas.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productIdeas.map((product: any) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardHeader className="pb-2">
                        <CardTitle className="flex justify-between items-start">
                          <span className="text-lg font-semibold text-primary truncate">
                            {product.productData.name}
                          </span>
                          <span className="text-green-600 font-bold text-lg ml-2">
                            {product.productData.price}
                          </span>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {product.productData.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.productData.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span key={index} className={`${index % 3 === 0 ? 'bg-primary/10 text-primary' : index % 3 === 1 ? 'bg-secondary/10 text-secondary' : 'bg-green-100 text-green-600'} px-2 py-1 rounded-full text-xs`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">
                            {new Date(product.createdAt).toLocaleDateString()}
                          </span>
                          <Button size="sm" variant="outline" onClick={() => viewProductIdea(product.productData)}>
                            View Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-medium mb-2">No Saved Ideas Yet</h3>
                      <p className="text-gray-600">Generate your first product idea to get started</p>
                    </div>
                    <Button asChild>
                      <Link href="/#try-it">
                        Generate First Idea
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="account">
              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1">{user.email}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Account Type</h3>
                      <p className="mt-1">{isPro ? "Pro" : "Free"}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Account Security</h3>
                    <Button variant="outline">Change Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {isPro && (
              <TabsContent value="subscription">
                <Card>
                  <CardHeader>
                    <CardTitle>Your Subscription</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">Pro Plan</h3>
                          <p className="text-gray-600">Billed monthly</p>
                        </div>
                        <div className="text-2xl font-bold">$49/mo</div>
                      </div>
                      <div className="text-sm text-gray-600">
                        Your next billing date is <span className="font-medium">June 15, 2023</span>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="text-destructive">
                      Cancel Subscription
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </main>

      <ProductModal 
        isOpen={productModalOpen} 
        onClose={() => setProductModalOpen(false)} 
        productData={selectedProduct}
      />
      
      <Footer />
    </div>
  );
};

export default Dashboard;
