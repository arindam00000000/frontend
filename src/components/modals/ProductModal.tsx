import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";
import ProductResults from "@/components/ProductResults";

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  productData: any | null;
}

const ProductModal = ({ isOpen, onClose, productData }: ProductModalProps) => {
  if (!productData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-900">Your AI-Generated Product</DialogTitle>
        </DialogHeader>
        
        <div className="bg-green-50 text-green-800 px-4 py-3 rounded-lg mb-8">
          <div className="flex items-center">
            <i className="fas fa-check-circle text-green-500 mr-2"></i>
            <span className="font-medium">Product idea generated successfully!</span>
          </div>
        </div>
        
        <ProductResults 
          productData={productData}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
