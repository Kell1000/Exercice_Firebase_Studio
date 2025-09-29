import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Destination } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface DestinationCardProps {
  destination: Destination;
}

export default function DestinationCard({ destination }: DestinationCardProps) {
  const image = PlaceHolderImages.find((p) => p.id === destination.imageId);

  return (
    <Link href="#" className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative h-56 w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                {destination.name}
              </CardTitle>
              <p className="text-muted-foreground">{destination.country}</p>
            </div>
            <Badge variant="outline" className="capitalize">
              {destination.travelType}
            </Badge>
          </div>
          <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
            {destination.description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
