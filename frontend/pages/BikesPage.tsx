import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backend from "~backend/client";
import type { Bike } from "~backend/bikes/list";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const fadeInUp = "animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0";
const stagger = (index: number) => ({ animationDelay: `${index * 0.1}s` });

export default function BikesPage() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadBikes();
  }, []);

  const loadBikes = async () => {
    try {
      const response = await backend.bikes.list();
      setBikes(response.bikes);
    } catch (error) {
      console.error("Failed to load bikes:", error);
      toast({
        title: "Error",
        description: "Failed to load bikes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">Loading bikes...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
      `}</style>
      
      <div className="mb-12 animate-[fadeInUp_0.6s_ease-out]">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Our Bike Fleet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Choose from our carefully selected motorcycles, perfect for exploring Kenya's diverse terrain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike, index) => (
          <Card 
            key={bike.id} 
            className={`overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group ${fadeInUp}`}
            style={stagger(index)}
          >
            <div className="aspect-video bg-muted relative overflow-hidden">
              <img 
                src={bike.imageUrl} 
                alt={bike.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {bike.available ? (
                <Badge className="absolute top-2 right-2 bg-green-500 animate-pulse shadow-lg">Available</Badge>
              ) : (
                <Badge className="absolute top-2 right-2 shadow-lg" variant="secondary">
                  Rented
                </Badge>
              )}
              <Badge variant="outline" className="absolute top-2 left-2 bg-black/50 text-white border-white/20">{bike.type}</Badge>
            </div>

            <CardContent className="pt-6">
              <h3 className="font-bold text-xl mb-2 group-hover:text-primary transition-colors">{bike.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{bike.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <MapPin className="h-4 w-4" />
                <span>{bike.location}</span>
              </div>

              <div className="space-y-2 mb-4">
                {bike.features.slice(0, 3).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  KES {bike.pricePerDay.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/day</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to={`/booking/bike/${bike.id}`} className="w-full">
                <Button className="w-full group-hover:shadow-lg transition-shadow" disabled={!bike.available}>
                  {bike.available ? "Book Now" : "Not Available"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
