import { BrandStatement } from "@/components/home/brand-statement";
import { HomeCta } from "@/components/home/home-cta";
import { HeroSlideshow, type HeroSlide } from "@/components/home/hero-slideshow";
import { Process } from "@/components/home/process";
import { ServicesPreview } from "@/components/home/services-preview";
import { WelcomeSplit } from "@/components/home/welcome-split";
import { projects } from "@/data/projects";

const slides: HeroSlide[] = [
  { src: "/images/home/abound-cover-red.jpeg", alt: "Abound With Creative Idea red cover artwork", title: "Abound With Creative Idea", fit: "cover" },
  ...projects.map((project) => ({ src: project.coverImage, alt: project.gallery[0].alt, title: project.title })),
];

export default function Home() {
  return <>
    <HeroSlideshow slides={slides} />
    <WelcomeSplit />
    <ServicesPreview />
    <BrandStatement />
    <Process />
    <HomeCta />
  </>;
}
