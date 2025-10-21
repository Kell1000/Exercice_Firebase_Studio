import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { userReviews } from "@/lib/placeholder-data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Star } from "lucide-react";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-5 w-5 ${
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Tales from the Trail
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Hear from our community of explorers and get inspired for your next
          journey.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
        {userReviews.map((review) => {
          const userAvatar = PlaceHolderImages.find(
            (p) => p.id === review.userAvatarId
          );
          return (
            <Card key={review.id} className="break-inside-avoid">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar>
                    {userAvatar && (
                      <AvatarImage
                        src={userAvatar.imageUrl}
                        alt={review.userName}
                        data-ai-hint={userAvatar.imageHint}
                      />
                    )}
                    <AvatarFallback>
                      {review.userName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      Traveled to {review.destination}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  "{review.reviewText}"
                </p>
              </CardContent>
              <CardFooter>
                <StarRating rating={review.rating} />
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
