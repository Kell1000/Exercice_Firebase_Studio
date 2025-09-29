import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trendingDestinations, specialOffers } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ArrowRight } from "lucide-react";
import DestinationCard from "@/components/destination-card";

export default function Home() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-image");

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 p-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-shadow-lg">
            Find Your Next Adventure 🧭
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl mx-auto text-shadow">
            Your journey starts here. Explore breathtaking destinations and create unforgettable memories.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/destinations">
              Explore Destinations <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Trending Destinations */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            🔥 Trending Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingDestinations.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Preview */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            ✈️ Special Travel Deals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {specialOffers.slice(0, 2).map((offer) => {
              const offerImage = PlaceHolderImages.find(
                (p) => p.id === offer.imageId
              );
              return (
                <Card
                  key={offer.id}
                  className="overflow-hidden flex flex-col md:flex-row group hover:shadow-xl transition-shadow duration-300"
                >
                  {offerImage && (
                    <div className="md:w-1/3 relative h-48 md:h-auto">
                      <Image
                        src={offerImage.imageUrl}
                        alt={offerImage.description}
                        fill
                        className="object-cover"
                        data-ai-hint={offerImage.imageHint}
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col justify-between md:w-2/3">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        {offer.title}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {offer.destination}
                      </p>
                      <div className="flex items-baseline gap-2 mb-4">
                        <span className="text-2xl font-bold text-primary">
                          ${offer.price}
                        </span>
                        <span className="text-md line-through text-muted-foreground">
                          ${offer.originalPrice}
                        </span>
                      </div>
                    </div>
                    <Button asChild className="mt-auto self-start">
                      <Link href="/offers">View Deal</Link>
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Button asChild variant="outline">
              <Link href="/offers">
                See All Offers <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
