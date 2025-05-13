import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckIcon, XIcon } from "lucide-react";
import { ReactNode } from "react";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  description: string | React.ReactNode;
  features: PricingFeature[];
  action: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  isPrimary?: boolean;
  popularBadge?: boolean;
  footerText?: string;
  delay?: number;
}

const PricingCard = ({
  title,
  price,
  description,
  features,
  action,
  isPrimary = false,
  popularBadge = false,
  footerText,
  delay = 0
}: PricingCardProps) => {
  return (
    <Card 
      className={`bg-white rounded-2xl ${isPrimary ? 'shadow-xl border-2 border-primary' : 'shadow-sm border border-gray-200 hover:border-primary/40'} relative transition-all duration-300 animate-on-scroll`}
      data-delay={delay}
    >
      {popularBadge && (
        <div className="absolute top-0 right-0 bg-primary text-white py-1 px-4 rounded-bl-xl rounded-tr-xl text-sm font-medium">
          Most Popular
        </div>
      )}
      
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
          <div className="flex items-center justify-center">
            <span className="text-4xl font-bold">{price}</span>
            {price !== "Free" && <span className="text-gray-500 ml-2">/month</span>}
          </div>
          <div className="text-gray-600 mt-2">{description}</div>
        </div>
        
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <>
                  <CheckIcon className="text-green-500 mt-1 mr-3 h-5 w-5" />
                  <span className="text-gray-600">{feature.text}</span>
                </>
              ) : (
                <>
                  <XIcon className="text-gray-300 mt-1 mr-3 h-5 w-5" />
                  <span className="text-gray-400">{feature.text}</span>
                </>
              )}
            </li>
          ))}
        </ul>
        
        <Button
          variant={isPrimary ? "default" : "outline"}
          className={`w-full py-6 ${
            isPrimary 
              ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/30 transform hover:-translate-y-0.5" 
              : "text-primary border-2 border-primary hover:bg-primary/5"
          } transition duration-300 rounded-xl font-medium`}
          asChild
          onClick={action.onClick}
        >
          <a href={action.href}>{action.text}</a>
        </Button>
      </CardContent>
      
      {footerText && (
        <CardFooter className="px-8 pb-6 pt-0">
          <p className="text-center text-gray-500 text-xs w-full">
            {footerText}
          </p>
        </CardFooter>
      )}
    </Card>
  );
};

export default PricingCard;
