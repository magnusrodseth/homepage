"use client";

import { getAllTestimonials } from "@/lib/data/testimonials";
import { H3, Muted, Small } from "@/components/ui/typography";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function Testimonials() {
  const testimonials = getAllTestimonials();

  return (
    <section className="mt-16 animate-slide-enter delay-500">
      <H3 className="mb-6 text-xl">What others say</H3>

      <Carousel className="w-full max-w-3xl mx-auto" opts={{ loop: true }}>
        <CarouselContent>
          {testimonials.map((testimonial) => (
            <CarouselItem key={testimonial.id} className="h-auto">
              <div
                className={cn(
                  "rounded-lg border border-border/50 bg-background/50 p-6 h-full min-h-[200px] flex flex-col"
                )}
              >
                <p className="text-muted-foreground italic text-sm leading-relaxed flex-1">
                  {testimonial.quote}
                </p>

                <div className="mt-4 flex items-center gap-2 pt-4 border-t border-border/30">
                  <div>
                    <Small className="text-foreground font-medium">
                      {testimonial.author.name}
                    </Small>
                    <Muted className="text-xs">
                      {testimonial.author.role},{" "}
                      {testimonial.author.companyUrl ? (
                        <Link
                          href={testimonial.author.companyUrl}
                          target="_blank"
                          className="hover:text-foreground transition-colors"
                        >
                          {testimonial.author.company}
                        </Link>
                      ) : (
                        testimonial.author.company
                      )}
                    </Muted>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}
