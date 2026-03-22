import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export const PropertySkeleton = () => {
  return (
    <Card className="overflow-hidden border-border/50">
      <AspectRatio ratio={16 / 9}>
        <Skeleton className="w-full h-full" />
      </AspectRatio>
      <CardHeader className="p-4 pb-0">
        <Skeleton className="h-3 w-1/4 mb-2" />
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="flex justify-between border-t border-border/50 pt-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  )
}
