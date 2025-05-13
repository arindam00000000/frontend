import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  rating: number;
  content: string;
  author: {
    name: string;
    title: string;
    avatarUrl: string;
  };
  delay?: number;
}

const TestimonialCard = ({ rating, content, author, delay = 0 }: TestimonialCardProps) => {
  return (
    <Card className="bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-on-scroll" data-delay={delay}>
      <CardContent className="p-8">
        <div className="flex items-center mb-6">
          <div className="text-yellow-400 flex">
            {[...Array(5)].map((_, i) => (
              <i 
                key={i} 
                className={`fas ${i < Math.floor(rating) ? 'fa-star' : i < rating ? 'fa-star-half-alt' : 'fa-star'}`}
              ></i>
            ))}
          </div>
          <span className="ml-2 text-gray-600 text-sm">{rating.toFixed(1)}</span>
        </div>
        <p className="text-gray-700 mb-6">
          "{content}"
        </p>
        <div className="flex items-center">
          <img 
            src={author.avatarUrl} 
            alt={author.name}
            className="w-12 h-12 rounded-full object-cover" 
          />
          <div className="ml-4">
            <h4 className="font-medium text-gray-900">{author.name}</h4>
            <p className="text-gray-500 text-sm">{author.title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
