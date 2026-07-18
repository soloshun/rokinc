import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { ProjectCard } from "@/components/ProjectCard";
import { Stagger } from "@/components/motion";
import { DonateCTA } from "@/components/DonateCTA";
import { getProjects } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Our Work",
  description:
    "Past ROKinc projects and outreaches — widows and orphans missions, prison and hospital visits, and high school ministry across Ghana.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <>
      <PageHeader
        kicker="Our Work"
        title="Every photo here is a person, not a project."
        intro="Look through what God has done through ROKinc — outreach by outreach, community by community."
      />
      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Stagger className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </Stagger>
        </div>
      </section>
      <DonateCTA />
    </>
  );
}
