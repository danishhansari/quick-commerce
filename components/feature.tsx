import { type LucideIcon } from 'lucide-react'

import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  return (
    <div className="hover:shadow-lg transition-shadow border max-w-md w-full text-center py-2  md:py-4 rounded-md">  
        <Icon className="mx-auto block h-4 w-4 md:h-6 md:h-6 text-primary mb-2" />
      <div className=''>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}

