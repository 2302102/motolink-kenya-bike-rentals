import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import backend from "~backend/client";
import type { Tour } from "~backend/tours/list";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Calendar, Users, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadTours();
  }, []);

  const loadTours = async () => {
    try {
      const response = await backend.tours.list();
      setTours(response.tours);
    } catch (error) {
      console.error("Failed to load tours:", error);
      toast({
        title: "Error",
        description: "Failed to load tours. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-500";
      case "moderate":
        return "bg-yellow-500";
      case "hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">Loading tours...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Guided Tours</h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover Kenya's breathtaking landscapes with our expertly curated motorcycle tours
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {tours.map((tour) => (
          <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <div className="text-6xl mb-2">🏔️</div>
                  <div className="text-sm font-medium">{tour.destination}</div>
                </div>
              </div>
              <Badge className={`absolute top-2 right-2 ${getDifficultyColor(tour.difficulty)}`}>
                {tour.difficulty}
              </Badge>
            </div>

            <CardContent className="pt-6">
              <h3 className="font-bold text-2xl mb-2">{tour.name}</h3>
              <p className="text-muted-foreground mb-4">{tour.description}</p>

              <div className="grid grid-cols-3 gap-4 mb-4 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>{tour.destination}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>{tour.durationDays} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" />
                  <span>Max {tour.maxParticipants}</span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <h4 className="font-semibold text-sm flex items-center gap-2">
                  <Star className="h-4 w-4 text-primary" />
                  Tour Highlights
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {tour.highlights.map((highlight, idx) => (
                    <div key={idx} className="text-sm text-muted-foreground flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      {highlight}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="text-2xl font-bold text-primary">
                  KES {tour.price.toLocaleString()}
                  <span className="text-sm font-normal text-muted-foreground">/person</span>
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Link to={`/booking/tour/${tour.id}`} className="w-full">
                <Button className="w-full" disabled={!tour.available}>
                  {tour.available ? "Book Tour" : "Fully Booked"}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
