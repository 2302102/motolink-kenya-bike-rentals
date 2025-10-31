import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bike, Map, Wrench, Shield, Award, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div>
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
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
      <section 
        className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 sm:py-32 bg-cover bg-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1527437632069-fee7661b0e57?w=1600&q=80')",
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-white animate-[fadeInUp_0.8s_ease-out]">
              Explore Kenya on Two Wheels
            </h1>
            <p className="text-lg sm:text-xl text-gray-100 max-w-2xl mx-auto mb-8 animate-[fadeInUp_1s_ease-out]">
              Premium motorcycle rentals and guided tours across Kenya's most stunning landscapes.
              Your adventure starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-[fadeInUp_1.2s_ease-out]">
              <Link to="/bikes">
                <Button size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform duration-200">
                  Browse Bikes
                </Button>
              </Link>
              <Link to="/tours">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 text-white border-white hover:bg-white/20 hover:scale-105 transition-transform duration-200">
                  View Tours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-[fadeInUp_0.6s_ease-out]">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Why Choose MotoLink Kenya?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We provide exceptional service and unforgettable experiences for motorcycle enthusiasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.1s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Bike className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Premium Fleet</h3>
                <p className="text-sm text-muted-foreground">
                  Well-maintained motorcycles from top brands, perfect for any terrain
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.2s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Map className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Guided Tours</h3>
                <p className="text-sm text-muted-foreground">
                  Expert-led tours to Kenya's most beautiful destinations
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.3s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Wrench className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Garage Services</h3>
                <p className="text-sm text-muted-foreground">
                  Professional maintenance and repair services for your bike
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.4s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Emergency Support</h3>
                <p className="text-sm text-muted-foreground">
                  Round-the-clock SOS assistance for your peace of mind
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.5s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Competitive Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent pricing with no hidden fees, best value guaranteed
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 group animate-[fadeInUp_0.6s_ease-out] opacity-0" style={{animationDelay: '0.6s', animationFillMode: 'forwards'}}>
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors group-hover:animate-[float_2s_ease-in-out_infinite]">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Expert Team</h3>
                <p className="text-sm text-muted-foreground">
                  Experienced guides and mechanics dedicated to your journey
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Ready for Your Next Adventure?</h2>
              <p className="text-muted-foreground mb-6">
                Whether you're looking for a weekend ride or a multi-day tour across Kenya's
                breathtaking landscapes, we have the perfect bike and route for you.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Flexible rental periods</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">All equipment included</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Insurance coverage available</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-sm">Free route planning assistance</span>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-8 shadow-lg border">
              <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Choose from our extensive fleet or join one of our curated tours
              </p>
              <div className="space-y-3">
                <Link to="/bikes">
                  <Button className="w-full hover:scale-105 transition-transform">Rent a Bike</Button>
                </Link>
                <Link to="/tours">
                  <Button variant="outline" className="w-full hover:scale-105 transition-transform">
                    Book a Tour
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
