import Link from "next/link";
import { Reveal, Stagger } from "@/components/motion";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";
import type { Project } from "@/lib/types";

export function FeaturedWork({ projects }: { projects: Project[] }) {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const shown = featured.length ? featured : projects.slice(0, 3);

  return (
    <section className="bg-paper py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Recent work"
            title="Stories from the field."
            intro="Every project is a collection of names and faces — here are a few of the most recent."
          />
          <Reveal delay={0.2}>
            <Link
              href="/projects"
              className="group flex items-center gap-2 rounded-full border border-rok-200 px-5 py-3 text-sm font-semibold text-rok-800 transition-all hover:border-rok-300 hover:bg-rok-50"
            >
              All projects
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
