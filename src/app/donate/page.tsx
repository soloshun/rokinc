import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { DonatePanel } from "@/components/donate/DonatePanel";
import { Reveal } from "@/components/motion";
import { getDonationMethods, getSettings } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = pageMetadata({
  title: "Donate",
  description:
    "Give to ROKinc — support widows, orphans, prison and hospital outreaches, and high school missions in Ghana.",
  path: "/donate",
});

export default async function DonatePage() {
  const [methods, settings] = await Promise.all([
    getDonationMethods(),
    getSettings(),
  ]);

  return (
    <>
      <PageHeader
        kicker="Donate"
        title="Your gift becomes love, delivered in person."
        intro="Every cedi and every dollar goes into the field — food, clothing, medicine, school materials, and the gospel, hand to hand."
      />

      <section className="bg-paper pb-24 sm:pb-32">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <DonatePanel methods={methods} />

          <Reveal className="mt-20">
            <div className="rounded-3xl bg-rok-50 p-8 text-center ring-1 ring-rok-100 sm:p-12">
              <p className="font-display text-xl italic text-rok-900 sm:text-2xl">
                “Each of you should give what you have decided in your heart to
                give, not reluctantly or under compulsion, for God loves a
                cheerful giver.”
              </p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-rok-500">
                2 Corinthians 9:7
              </p>
              <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink-soft">
                Have a question about giving, or want a receipt or wire
                details? Write to{" "}
                <a
                  href={`mailto:${settings.contactEmail}`}
                  className="font-semibold text-rok-700 underline-offset-4 hover:underline"
                >
                  {settings.contactEmail}
                </a>{" "}
                or reach us on{" "}
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-rok-700 underline-offset-4 hover:underline"
                >
                  WhatsApp
                </a>
                . We&apos;ll respond quickly.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
