import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Sparkles,  Package, Clock } from 'lucide-react'
import { FeatureCard } from "./feature"

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/20 via-background to-primary/5 overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/5" />
      <div className="absolute h-96 w-96 -top-48 -right-48 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute h-96 w-96 -bottom-48 -left-48 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 md:px-20 py-12 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <Badge variant="outline" className="inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              New Features Available
            </Badge>

            <div className="space-y-4">
              <h1 className="text-5xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Transform Your Shopping Experience
              </h1>
              <p className="text-xl text-muted-foreground">
                Discover a world of instant commerce at your fingertips
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="group">
                <ShoppingCart className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
                Start Shopping
              </Button>
              
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
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

