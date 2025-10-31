import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backend from "~backend/client";
import type { Bike } from "~backend/bikes/list";
import type { Tour } from "~backend/tours/list";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Calendar, MapPin, CheckCircle } from "lucide-react";

export default function BookingPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const fadeInUp = "animate-[fadeInUp_0.6s_ease-out_forwards] opacity-0";

  const [item, setItem] = useState<Bike | Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerId: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  useEffect(() => {
    loadItem();
  }, [type, id]);

  const loadItem = async () => {
    try {
      if (type === "bike") {
        const bike = await backend.bikes.get({ id: Number(id) });
        setItem(bike);
      } else if (type === "tour") {
        const tour = await backend.tours.get({ id: Number(id) });
        setItem(tour);
      }
    } catch (error) {
      console.error("Failed to load item:", error);
      toast({
        title: "Error",
        description: "Failed to load booking details.",
        variant: "destructive",
      });
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!item || !formData.startDate || !formData.endDate) return 0;

    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (type === "bike" && "pricePerDay" in item) {
      return days * item.pricePerDay;
    } else if (type === "tour" && "price" in item) {
      return item.price;
    }
    return 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const total = calculateTotal();
      await backend.bookings.create({
        ...formData,
        bookingType: type as "bike" | "tour",
        itemId: Number(id),
        startDate: new Date(formData.startDate),
        endDate: new Date(formData.endDate),
        totalPrice: total,
      });

      toast({
        title: "Booking Confirmed!",
        description: "We'll contact you shortly to finalize the details.",
      });
      navigate("/");
    } catch (error) {
      console.error("Failed to create booking:", error);
      toast({
        title: "Error",
        description: "Failed to create booking. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!item) return null;

  const isBike = "pricePerDay" in item;
  const total = calculateTotal();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
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
      `}</style>
      
      <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent animate-[fadeInUp_0.6s_ease-out]">Complete Your Booking</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <Card className="hover:shadow-xl transition-shadow animate-[fadeInUp_0.8s_ease-out]">
            <CardHeader>
              <CardTitle>
                {isBike ? "Bike" : "Tour"} Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-bold text-xl mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {isBike ? (item as Bike).description : (item as Tour).description}
                </p>
              </div>

              {isBike ? (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{(item as Bike).location}</span>
                  </div>
                  <div className="space-y-2">
                    {(item as Bike).features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-2xl font-bold text-primary">
                      KES {(item as Bike).pricePerDay.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/day</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{(item as Tour).destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{(item as Tour).durationDays} days</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="text-2xl font-bold text-primary">
                      KES {(item as Tour).price.toLocaleString()}
                      <span className="text-sm font-normal text-muted-foreground">/person</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="hover:shadow-xl transition-shadow animate-[fadeInUp_1s_ease-out]">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    required
                    value={formData.customerName}
                    onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.customerEmail}
                    onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                    placeholder="john@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.customerPhone}
                    onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                    placeholder="+254 700 123 456"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="idNumber">ID Number</Label>
                  <Input
                    id="idNumber"
                    required
                    value={formData.customerId}
                    onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
                    placeholder="12345678"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      required
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      required
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      min={formData.startDate || new Date().toISOString().split("T")[0]}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any special requests or questions?"
                    rows={3}
                  />
                </div>

                {total > 0 && (
                  <div className="pt-4 border-t">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-muted-foreground">Total Cost:</span>
                      <span className="text-2xl font-bold text-primary">
                        KES {total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full hover:scale-105 transition-transform" disabled={submitting || total === 0}>
                  {submitting ? "Processing..." : "Confirm Booking"}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  You'll receive a confirmation email with payment instructions
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
