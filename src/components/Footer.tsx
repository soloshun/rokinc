import Image from "next/image";
import Link from "next/link";
import { getSettings } from "@/lib/content";
import { ORG } from "@/lib/copy";

export async function Footer() {
  const settings = await getSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-rok-950 text-rok-100">
      <div className="grain absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/brand/logo.png"
              alt="ROKinc"
              width={150}
              height={75}
              className="h-12 w-auto brightness-0 invert opacity-90"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-rok-200/80">
              {ORG.fullName} — a Christian nonprofit committed to creating
              change in humanity through the love of Christ.
            </p>
            <p className="mt-6 font-display text-sm italic text-rok-300/90">
              “Truly I tell you, whatever you did for one of the least of these
              brothers and sisters of mine, you did for me.”
              <span className="mt-1 block not-italic text-xs tracking-wide text-rok-400">
                — Matthew 25:40
              </span>
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rok-400">
              Explore
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li><Link href="/" className="transition-colors hover:text-white">Home</Link></li>
              <li><Link href="/projects" className="transition-colors hover:text-white">Our Work</Link></li>
              <li><Link href="/upcoming" className="transition-colors hover:text-white">Upcoming Projects</Link></li>
              <li><Link href="/donate" className="transition-colors hover:text-white">Donate</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-rok-400">
              Connect
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a href={`mailto:${settings.contactEmail}`} className="transition-colors hover:text-white">
                  {settings.contactEmail}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {settings.phone}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${settings.whatsapp.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  WhatsApp
                </a>
              </li>
              {settings.instagram && (
                <li>
                  <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    Instagram
                  </a>
                </li>
              )}
              {settings.facebook && (
                <li>
                  <a href={settings.facebook} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-rok-800/60 pt-6 text-xs text-rok-400 sm:flex-row sm:items-center">
          <p>© {year} {ORG.fullName} All rights reserved.</p>
          <p>Creating change in humanity through the love of Christ.</p>
        </div>
      </div>
    </footer>
  );
}
