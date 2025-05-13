import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  exampleContent: ReactNode;
  colorClass: string;
  delay?: number;
}

const FeatureCard = ({ 
  icon, 
  title, 
  description, 
  exampleContent,
  colorClass,
  delay = 0
}: FeatureCardProps) => {
  return (
    <Card className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll" data-delay={delay}>
      <CardContent className="p-8">
        <div className={`w-14 h-14 ${colorClass} rounded-xl flex items-center justify-center text-primary mb-6`}>
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          {exampleContent}
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
