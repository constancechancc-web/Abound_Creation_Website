import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <article className="group">
    <Link href={`/work/${project.slug}`} className="block">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
        <Image src={project.coverImage} alt={project.gallery[0].alt} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]" />
      </div>
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 border-t border-black/70 pt-4 text-xs uppercase tracking-[.08em]">
        <span className="text-brand-red">{String(index + 1).padStart(2, "0")}</span>
        <div>
          <h2 className="text-lg font-semibold normal-case tracking-[-.03em] md:text-2xl">{project.title}</h2>
          <p className="mt-1 text-brand-gray transition-colors group-hover:text-brand-red">{project.category}</p>
        </div>
        <span>{project.year} ↗</span>
      </div>
    </Link>
  </article>;
}