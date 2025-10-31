import { useState } from "react";
import backend from "~backend/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { AlertCircle, Phone, MapPin, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SOSPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    location: "",
    emergencyType: "breakdown" as "breakdown" | "accident" | "medical" | "security" | "other",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await backend.sos.createRequest(formData);
      toast({
        title: "SOS Request Sent",
        description: "Help is on the way! We'll contact you immediately.",
      });
      setFormData({
        name: "",
        phone: "",
        location: "",
        emergencyType: "breakdown",
        description: "",
      });
    } catch (error) {
      console.error("Failed to submit SOS request:", error);
      toast({
        title: "Error",
        description: "Failed to submit request. Please call emergency hotline.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-destructive">Emergency SOS</h1>
        <p className="text-lg text-muted-foreground">
          24/7 emergency assistance for riders in need
        </p>
      </div>

      <Alert variant="destructive" className="mb-8">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle>Emergency Hotline</AlertTitle>
        <AlertDescription>
          <div className="mt-2 space-y-2">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="font-semibold">+254 700 123 456</span>
            </div>
            <p className="text-sm">For life-threatening emergencies, call immediately!</p>
          </div>
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  Our emergency team responds within minutes to all SOS requests
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-background">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Nationwide Coverage</h3>
                <p className="text-sm text-muted-foreground">
                  We have support teams across Kenya to assist you wherever you are
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submit Emergency Request</CardTitle>
          <CardDescription>
            Fill out this form if you need immediate assistance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+254 700 123 456"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Current Location</Label>
              <Input
                id="location"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Nearest landmark or GPS coordinates"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Emergency Type</Label>
              <Select
                value={formData.emergencyType}
                onValueChange={(value: typeof formData.emergencyType) =>
                  setFormData({ ...formData, emergencyType: value })
                }
              >
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="breakdown">Mechanical Breakdown</SelectItem>
                  <SelectItem value="accident">Accident</SelectItem>
                  <SelectItem value="medical">Medical Emergency</SelectItem>
                  <SelectItem value="security">Security Issue</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your emergency situation..."
                rows={4}
              />
            </div>

            <Button type="submit" className="w-full" variant="destructive" disabled={loading}>
              {loading ? "Sending SOS..." : "Send Emergency Request"}
            </Button>

            <p className="text-xs text-center text-muted-foreground">
              By submitting this form, you authorize us to share your location with emergency responders
            </p>
          </form>
        </CardContent>
      </Card>

      <Card className="mt-8 bg-muted/50">
        <CardHeader>
          <CardTitle className="text-lg">What to Expect</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-sm">
            <li className="flex gap-3">
              <span className="font-semibold text-primary">1.</span>
              <span>Your SOS request is received and logged immediately</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary">2.</span>
              <span>Our emergency coordinator will call you within 5 minutes</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary">3.</span>
              <span>We dispatch the nearest support team to your location</span>
            </li>
            <li className="flex gap-3">
              <span className="font-semibold text-primary">4.</span>
              <span>We stay in contact until the situation is resolved</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
