import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHeader } from "@/components/PageHeader";
import { Gallery } from "@/components/Gallery";
import { DonateCTA } from "@/components/DonateCTA";
import { Reveal } from "@/components/motion";
import { formatDate, getProject, getProjects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";
import { ORG } from "@/lib/copy";

export const revalidate = 300;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};
  const image = project.coverImage || "/og.png";
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.slug}`,
      siteName: "ROKinc",
      title: project.title,
      description: project.description,
      images: [{ url: image, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [image],
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  // Article + breadcrumb markup so Google can show this outreach with its
  // date, image, and a "Home › Our Work" trail in search results.
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: project.title,
        description: project.description,
        image: project.coverImage ? absoluteUrl(project.coverImage) : absoluteUrl("/og.png"),
        datePublished: project.date || undefined,
        url: absoluteUrl(`/projects/${project.slug}`),
        author: { "@type": "Organization", name: ORG.fullName },
        publisher: {
          "@type": "Organization",
          name: ORG.fullName,
          logo: { "@type": "ImageObject", url: absoluteUrl("/brand/logo.png") },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Our Work", item: absoluteUrl("/projects") },
          { "@type": "ListItem", position: 3, name: project.title },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHeader
        kicker={`${formatDate(project.date)} · ${project.location}`}
        title={project.title}
        intro={project.description}
      />
      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <Gallery images={project.images} title={project.title} />
          <Reveal className="mt-16 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-full border border-rok-200 px-6 py-3 text-sm font-semibold text-rok-800 transition-all hover:border-rok-300 hover:bg-rok-50"
            >
              ← Back to all projects
            </Link>
          </Reveal>
        </div>
      </section>
      <DonateCTA />
    </>
  );
}
