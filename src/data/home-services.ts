export type HomeService = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export const homeServices: readonly HomeService[] = [
  { number: "01", title: "Branding", description: "Brand strategy, identity and systems that create a clear, consistent and recognisable presence.", image: "/images/projects/northline-objects/cover.svg" },
  { number: "02", title: "Apparel Design", description: "Custom uniforms and merchandise designed around your brand, people and environment.", image: "/images/projects/fieldwork-uniforms/cover.svg" },
  { number: "03", title: "Marketing", description: "Creative campaigns and marketing materials that turn ideas into meaningful communication.", image: "/images/projects/after-hours-campaign/cover.svg" },
  { number: "04", title: "Graphic Design", description: "Social, print, packaging and campaign design that communicates with clarity.", image: "/images/projects/meridian-holdings/cover.svg" },
  { number: "05", title: "Video & Photography", description: "Photography, brand films and social content shaped by a clear creative direction.", image: "/images/projects/forma-product-study/cover.svg" },
];
