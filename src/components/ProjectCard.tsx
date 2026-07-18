import Image from "next/image";
import Link from "next/link";
import { StaggerItem } from "./motion";
import { formatDate } from "@/lib/content";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <StaggerItem>
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-rok-100 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-rok-900/10"
      >
        <div className="relative overflow-hidden">
          <Image
            src={project.coverImage}
            alt={project.title}
            width={800}
            height={560}
            className="aspect-[10/7] w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-rok-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <span className="absolute bottom-4 left-4 translate-y-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-rok-800 opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
            View story →
          </span>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 text-xs font-medium text-rok-500">
            <span>{formatDate(project.date)}</span>
            {project.location && (
              <>
                <span aria-hidden>·</span>
                <span>{project.location}</span>
              </>
            )}
          </div>
          <h3 className="mt-2.5 font-display text-xl leading-snug text-ink transition-colors group-hover:text-rok-800">
            {project.title}
          </h3>
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-ink-soft">
            {project.description}
          </p>
        </div>
      </Link>
    </StaggerItem>
  );
}
