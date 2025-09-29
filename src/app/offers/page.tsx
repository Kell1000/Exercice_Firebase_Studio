import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { specialOffers } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Badge } from "@/components/ui/badge";

export default function OffersPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Special Offers & Deals
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Exclusive post-COVID travel deals for the modern explorer. Don't miss
          out on these limited-time offers!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {specialOffers.map((offer) => {
          const offerImage = PlaceHolderImages.find(
            (p) => p.id === offer.imageId
          );
          const discount = Math.round(
            ((offer.originalPrice - offer.price) / offer.originalPrice) * 100
          );
          return (
            <Card
              key={offer.id}
              className="overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64 w-full">
                {offerImage && (
                  <Image
                    src={offerImage.imageUrl}
                    alt={offerImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={offerImage.imageHint}
                  />
                )}
                <Badge className="absolute top-4 right-4 text-base">
                  {discount}% OFF
                </Badge>
              </div>

              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {offer.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {offer.destination}
                </p>
                <p className="text-sm mb-4">{offer.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      ${offer.price}
                    </span>
                    <span className="text-lg line-through text-muted-foreground">
                      ${offer.originalPrice}
                    </span>
                  </div>
                  <Button asChild>
                    <Link href="#">Book Now</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
