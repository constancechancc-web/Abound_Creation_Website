export type Service = {
  number: string;
  title: string;
  slug: string;
  description: string;
  detail: string;
  image: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Branding",
    slug: "branding",
    description: "Brand strategy, logo design, visual identity and brand systems that create a consistent and recognisable presence.",
    detail: "From positioning to rollout, we build visual systems that make every brand touchpoint feel connected.",
    image: "/images/projects/northline-objects/cover.svg",
  },
  {
    number: "02",
    title: "Uniform Design",
    slug: "uniform-design",
    description: "Custom uniform concepts designed around your brand, team and environment.",
    detail: "Practical garments shaped by brand codes, movement, material and the realities of daily work.",
    image: "/images/projects/fieldwork-uniforms/cover.svg",
  },
  {
    number: "03",
    title: "Marketing",
    slug: "marketing",
    description: "Creative campaigns and marketing materials that turn ideas into meaningful communication.",
    detail: "Campaign systems built to travel across print, social and physical environments without losing their voice.",
    image: "/images/projects/after-hours-campaign/cover.svg",
  },
  {
    number: "04",
    title: "Graphic Design",
    slug: "graphic-design",
    description: "From social media to brochures, packaging and campaigns — design that communicates with clarity.",
    detail: "Editorial discipline and strong ideas give everyday communication more presence and coherence.",
    image: "/images/projects/meridian-holdings/cover.svg",
  },
  {
    number: "05",
    title: "Photography",
    slug: "photography",
    description: "Professional photography that captures products, spaces, people and brands with intention.",
    detail: "Art direction, lighting and composition designed around how the image needs to work for the brand.",
    image: "/images/projects/forma-product-study/cover.svg",
  },
  {
    number: "06",
    title: "Videography",
    slug: "videography",
    description: "Visual storytelling through commercial videos, brand films, social content and creative productions.",
    detail: "From treatment to final cut, we create motion with a clear narrative and a recognisable visual language.",
    image: "/images/projects/sela-dining/cover.svg",
  },
];
