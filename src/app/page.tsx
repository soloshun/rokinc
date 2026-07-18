import { Hero } from "@/components/home/Hero";
import { Matthew25 } from "@/components/home/Matthew25";
import { Mission } from "@/components/home/Mission";
import { Programs } from "@/components/home/Programs";
import { FeaturedWork } from "@/components/home/FeaturedWork";
import { UpcomingPreview } from "@/components/home/UpcomingPreview";
import { DonateCTA } from "@/components/DonateCTA";
import { getProjects, getUpcomingEvents } from "@/lib/content";

export const revalidate = 300;

export default async function HomePage() {
  const [projects, events] = await Promise.all([
    getProjects(),
    getUpcomingEvents(),
  ]);

  const heroImages = projects
    .flatMap((p) => p.images)
    .slice(0, 3)
    .concat([
      "https://picsum.photos/seed/rokinc-hero-a/800/1000",
      "https://picsum.photos/seed/rokinc-hero-b/800/1000",
      "https://picsum.photos/seed/rokinc-hero-c/800/640",
    ])
    .slice(0, 3);

  return (
    <>
      <Hero images={heroImages} />
      <Mission />
      <Matthew25 />
      <Programs />
      <FeaturedWork projects={projects} />
      <UpcomingPreview events={events} />
      <DonateCTA />
    </>
  );
}
