import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Sparkles,  Package, Clock } from 'lucide-react'
import { FeatureCard } from "./feature"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br via-background to-secondary/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-20 py-12 relative md:mt-6">
        <div className="grid lg:grid-cols-2 gap-4 md:gap-12 items-center">
          <div className="space-y-4 md:space-y-6">
            <Badge variant="outline" className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New Features Available
            </Badge>

            <div className="space-y-4 md:space-y-6">
              <h1 className="text-3xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-primary/90  to-primary/50 bg-clip-text text-transparent">
                Transform Your Shopping Experience
              </h1>
              <p className="text-md md:text-lg text-muted-foreground">
                Discover a world of instant commerce at your fingertips
              </p>
            </div>

            <div className="flex flex-wrap gap-2 md:gap-4">
              <Button size="lg" className="group">
                <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Shopping
              </Button>
              
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-2 md:gap-4 max-w-sm">
              <FeatureCard
                icon={Package}
                title="50k+ Products"
                description="Curated selection"
              />
              <FeatureCard
                icon={Clock}
                title="24/7 Delivery"
                description="Always available"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

