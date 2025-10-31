import { useState } from "react";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Wrench, Clock, DollarSign, Users } from "lucide-react";

export default function GaragePage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  
  const garageImageUrl = "https://images.unsplash.com/photo-1650569664566-f0014dcf54e3?w=800&q=80";

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    bikeModel: "",
    issueDescription: "",
    location: "",
    urgency: "medium" as "low" | "medium" | "high",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await backend.garage.createRequest(formData);
      toast({
        title: "Request Submitted",
        description: "Our team will contact you shortly to schedule your service.",
      });
      setFormData({
        customerName: "",
        customerPhone: "",
        bikeModel: "",
        issueDescription: "",
        location: "",
        urgency: "medium",
      });
    } catch (error) {
      console.error("Failed to submit request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const services = [
    {
      name: "Basic Service",
      description: "Oil change, filter replacement, basic inspection",
      price: "KES 2,500 - 4,000",
      icon: Wrench,
    },
    {
      name: "Major Service",
      description: "Comprehensive inspection, fluid changes, brake service",
      price: "KES 6,000 - 10,000",
      icon: Wrench,
    },
    {
      name: "Emergency Repair",
      description: "On-road breakdown assistance and quick fixes",
      price: "KES 3,000+",
      icon: Clock,
    },
    {
      name: "Custom Work",
      description: "Modifications, upgrades, and custom installations",
      price: "Custom Quote",
      icon: DollarSign,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div 
        className="mb-12 rounded-2xl overflow-hidden h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url('${garageImageUrl}')` }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl font-bold mb-4">Garage Services</h1>
            <p className="text-lg max-w-2xl">
              Professional maintenance and repair services for your motorcycle
            </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Our Services</h2>
          <div className="grid gap-4">
            {services.map((service, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{service.description}</p>
                      <p className="text-sm font-medium text-primary">{service.price}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-muted/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Users className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-2">Expert Mechanics</h3>
                  <p className="text-sm text-muted-foreground">
                    Our certified mechanics have years of experience servicing all major motorcycle brands.
                    We use genuine parts and follow manufacturer guidelines to ensure your bike stays in
                    peak condition.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Request Service</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you within 24 hours
              </CardDescription>
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
                  <Label htmlFor="bike">Bike Model</Label>
                  <Input
                    id="bike"
                    required
                    value={formData.bikeModel}
                    onChange={(e) => setFormData({ ...formData, bikeModel: e.target.value })}
                    placeholder="Honda CB500X"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    required
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Nairobi"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Urgency</Label>
                  <Select
                    value={formData.urgency}
                    onValueChange={(value: "low" | "medium" | "high") =>
                      setFormData({ ...formData, urgency: value })
                    }
                  >
                    <SelectTrigger id="urgency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Within a week</SelectItem>
                      <SelectItem value="medium">Medium - Within 2-3 days</SelectItem>
                      <SelectItem value="high">High - Urgent/Same day</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="issue">Issue Description</Label>
                  <Textarea
                    id="issue"
                    required
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    placeholder="Describe the issue you're experiencing..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Request"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
