import { TypeIcon as type, type LucideIcon } from 'lucide-react'

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  gradientFrom: string
  gradientTo: string
}

export function FeatureCard({ icon: Icon, title, description, gradientFrom, gradientTo }: FeatureCardProps) {
  return (
    <div className={`flex-shrink-0 md:flex-shrink md:w-full p-4 rounded-lg transition-all duration-300 ease-in-out hover:shadow-sm`}
    style={{
      background: `linear-gradient(125deg, ${gradientFrom}, ${gradientTo})`,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
    }}>
 <div className="flex flex-col items-center text-center">
   {Icon && <Icon className="w-8 h-8 mb-3 text-gray-600" />}
   <h3 className="font-semibold mb-2 text-gray-700">{title}</h3>
   <p className="text-sm text-gray-500">{description}</p>
 </div>
</div>
  )
}

