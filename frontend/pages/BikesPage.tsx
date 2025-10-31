import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backend from "~backend/client";
import type { Bike } from "~backend/bikes/list";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

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
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Bike Fleet</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Choose from our carefully selected motorcycles, perfect for exploring Kenya's diverse terrain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bikes.map((bike) => (
          <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-2">🏍️</div>
                  <div className="text-sm">{bike.name}</div>
                </div>
              </div>
              {bike.available ? (
                <Badge className="absolute top-2 right-2 bg-green-500">Available</Badge>
              ) : (
                <Badge className="absolute top-2 right-2" variant="secondary">
                  Rented
                </Badge>
              )}
            </div>

            <CardContent className="pt-6">
              <div className="mb-2">
                <Badge variant="outline">{bike.type}</Badge>
              </div>
              <h3 className="font-bold text-xl mb-2">{bike.name}</h3>
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
                <div className="text-2xl font-bold text-primary">
                  KES {bike.pricePerDay.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/day</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to={`/booking/bike/${bike.id}`} className="w-full">
                <Button className="w-full" disabled={!bike.available}>
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
