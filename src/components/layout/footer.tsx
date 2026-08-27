import Image from "next/image";
import Link from "next/link";

const facebook = "https://www.facebook.com/profile.php?id=61576845867548";
const instagram = "https://www.instagram.com/aboundcreation/?utm_source=ig_web_button_share_sheet";

export function Footer() {
  return <footer className="bg-white px-5 pb-8 pt-24 md:px-[5vw] md:pt-36">
    <div className="grid gap-14 border-b border-black pb-16 md:grid-cols-12">
      <div className="md:col-span-8"><Image src="/brand/abound-logo.webp" alt="Abound Creation" width={720} height={720} className="h-auto w-48 md:w-64" /><p className="mt-10 max-w-4xl text-[clamp(2.7rem,7vw,7.2rem)] font-bold leading-[.86] tracking-[-.07em]">Abound with <span className="text-brand-red">creative idea.</span></p></div>
      <nav aria-label="Footer navigation" className="grid content-end gap-3 text-sm font-bold uppercase md:col-span-2">{[["Work","/work"],["Services","/services"],["About","/about"],["Contact","/contact"]].map(([label,href])=><Link key={href} href={href} className="hover:text-brand-red">{label}</Link>)}</nav>
      <div className="flex content-end flex-col justify-end gap-3 text-sm font-bold uppercase md:col-span-2"><a href={instagram} target="_blank" rel="noreferrer" className="hover:text-brand-red">Instagram</a><a href={facebook} target="_blank" rel="noreferrer" className="hover:text-brand-red">Facebook</a></div>
    </div>
    <div className="flex flex-col gap-4 pt-6 text-[11px] font-medium uppercase tracking-[.08em] sm:flex-row sm:justify-between"><span>© 2026 Abound Creation. All rights reserved.</span><a href="#top" className="hover:text-brand-red">Back to top ↑</a></div>
  </footer>;
}
