import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Loader2 } from "lucide-react";

interface ProductResultsProps {
  productData: {
    name: string;
    price: string;
    description: string;
    tags: string[];
    imageUrl?: string;
    marketingStrategy: {
      contentPreview: string;
      salesFunnel: string[];
    };
  };
  onClose: () => void;
}

const ProductResults = ({ productData, onClose }: ProductResultsProps) => {
  const { user, isPro } = useAuth();
  const { toast } = useToast();

  const { mutate: saveIdea, isPending } = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/product-ideas/save", { productData });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Product idea saved",
        description: "You can view it in your dashboard.",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Failed to save product idea",
        description: error instanceof Error ? error.message : "Please try again later",
      });
    },
  });

  return (
    <div className="space-y-8">
      {/* Product Idea */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Product Concept</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-2/3">
              <h5 className="text-xl font-bold text-primary mb-2">{productData.name}</h5>
              <div className="text-2xl font-bold text-green-600 mb-4">{productData.price}</div>
              <p className="text-gray-600 mb-4">
                {productData.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {productData.tags.map((tag, index) => (
                  <span key={index} className={`${index % 3 === 0 ? 'bg-primary/10 text-primary' : index % 3 === 1 ? 'bg-secondary/10 text-secondary' : 'bg-green-100 text-green-600'} px-3 py-1 rounded-full text-sm`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="md:w-1/3">
              {productData.imageUrl ? (
                <img src={productData.imageUrl} alt="Product Mockup" className="rounded-lg shadow-md w-full h-auto" />
              ) : (
                <div className="rounded-lg shadow-md w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketing Strategy */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Marketing Strategy</h4>
        <div className="bg-gray-50 rounded-xl p-6">
          <div className="space-y-4">
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Content Preview Strategy</h5>
              <p className="text-gray-600">{productData.marketingStrategy.contentPreview}</p>
            </div>
            <div>
              <h5 className="font-medium text-gray-900 mb-2">Sales Funnel</h5>
              <ol className="list-decimal pl-5 text-gray-600">
                {productData.marketingStrategy.salesFunnel.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          {!user ? (
            <Link href="/signup" className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition transform hover:-translate-y-0.5 hover:shadow-lg flex-1 text-center">
              Sign Up to Save Ideas
            </Link>
          ) : !isPro ? (
            <Link href="/#pricing" className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition transform hover:-translate-y-0.5 hover:shadow-lg flex-1 text-center">
              Unlock Pro Features
            </Link>
          ) : (
            <Button
              onClick={() => saveIdea()}
              disabled={isPending}
              className="bg-primary text-white font-medium px-6 py-3 rounded-lg hover:bg-primary/90 transition transform hover:-translate-y-0.5 hover:shadow-lg flex-1"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save This Idea'
              )}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            className="bg-white text-gray-800 font-medium px-6 py-3 rounded-lg border border-gray-300 hover:border-primary hover:text-primary transition flex-1"
          >
            Close
          </Button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-4">
          Pro members can save unlimited ideas and access detailed marketing plans
        </p>
      </div>
    </div>
  );
};

export default ProductResults;
