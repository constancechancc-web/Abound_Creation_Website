import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const projects = [
  { slug:"northline-objects", code:"NO", title:"NORTHLINE", sub:"OBJECTS / 01", bg:"#EEECE6", ink:"#080808", accent:"#1E4ED8" },
  { slug:"sela-dining", code:"SE", title:"SELA", sub:"FIRE / TABLE / PEOPLE", bg:"#F2E4CF", ink:"#342117", accent:"#DB4B23" },
  { slug:"meridian-holdings", code:"MH", title:"MERIDIAN", sub:"ONE AXIS / MANY DIRECTIONS", bg:"#E9ECE8", ink:"#081B35", accent:"#B7F22A" },
  { slug:"fieldwork-uniforms", code:"FW", title:"FIELDWORK", sub:"BUILT FOR THE SHIFT", bg:"#E9E1D3", ink:"#26382F", accent:"#C4482D" },
  { slug:"after-hours-campaign", code:"AH", title:"AFTER HOURS", sub:"18:00—02:00 / KOTA", bg:"#0A0A0A", ink:"#F5F1E8", accent:"#7B43FF" },
  { slug:"forma-product-study", code:"F01", title:"FORMA", sub:"STUDY 01 / EDGE + GRIP", bg:"#D9D7D1", ink:"#090909", accent:"#EC1D25" },
];
const names = ["cover","system","catalogue","packaging"];
const fileNames = {
  "sela-dining": ["cover","menu","signage","tableware"],
  "meridian-holdings": ["cover","report","signage","presentation"],
  "fieldwork-uniforms": ["cover","details","roles","specification"],
  "after-hours-campaign": ["cover","posters","map","social"],
  "forma-product-study": ["cover","profile","contact","series"],
};
const esc = (value) => value.replaceAll("&", "&amp;");
function svg(p, index) {
  const w = index === 1 ? 1200 : 1600;
  const h = index === 1 ? 1500 : index === 2 ? 1000 : 1200;
  const bars = Array.from({length:5},(_,i)=>`<rect x="${90+i*155}" y="${h-230-i*34}" width="120" height="${95+i*34}" fill="${i===3?p.accent:p.ink}"/>`).join("");
  const layouts = [
    `<rect x="${w*.48}" width="${w*.52}" height="${h}" fill="${p.ink}"/><text x="70" y="${h*.2}" font-size="${w*.19}" font-weight="900">${esc(p.code)}</text><circle cx="${w*.74}" cy="${h*.5}" r="${Math.min(w,h)*.23}" fill="${p.accent}"/><rect x="${w*.66}" y="${h*.24}" width="${w*.16}" height="${h*.52}" fill="${p.bg}" transform="rotate(18 ${w*.74} ${h*.5})"/>`,
    `<rect x="70" y="70" width="${w-140}" height="${h-140}" fill="none" stroke="${p.ink}" stroke-width="3"/><text x="90" y="${h*.26}" font-size="${w*.22}" font-weight="900" fill="${p.accent}">${esc(p.code)}</text><path d="M80 ${h*.56} H${w-80}" stroke="${p.ink}" stroke-width="18"/><path d="M${w*.33} 70 V${h-70}" stroke="${p.accent}" stroke-width="8"/>${bars}`,
    `<rect width="${w}" height="${h*.42}" fill="${p.ink}"/><text x="70" y="${h*.31}" font-size="${w*.12}" font-weight="900" fill="${p.bg}">${esc(p.title)}</text><rect x="${w*.58}" y="${h*.35}" width="${w*.26}" height="${h*.5}" fill="${p.accent}"/><circle cx="${w*.37}" cy="${h*.7}" r="${h*.18}" fill="none" stroke="${p.ink}" stroke-width="35"/>`,
    `<g transform="translate(${w*.5} ${h*.5}) rotate(-8)"><rect x="-${w*.32}" y="-${h*.29}" width="${w*.64}" height="${h*.58}" fill="${p.ink}"/><rect x="-${w*.23}" y="-${h*.2}" width="${w*.46}" height="${h*.4}" fill="${p.bg}"/><text x="0" y="20" text-anchor="middle" font-size="${w*.18}" font-weight="900" fill="${p.accent}">${esc(p.code)}</text></g><path d="M70 ${h-95} H${w-70}" stroke="${p.accent}" stroke-width="22"/>`,
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="t d"><title id="t">${esc(p.title)} visual study</title><desc id="d">Original graphic identity composition for the fictional ${esc(p.title)} project.</desc><rect width="${w}" height="${h}" fill="${p.bg}"/>${layouts[index]}<g font-family="Arial,Helvetica,sans-serif" fill="${p.ink}"><text x="70" y="${h-72}" font-size="30" font-weight="700">${esc(p.title)}</text><text x="${w-70}" y="${h-72}" text-anchor="end" font-size="20" letter-spacing="3">${esc(p.sub)}</text></g></svg>`;
}
for (const p of projects) {
  const dir = join("public","images","projects",p.slug);
  mkdirSync(dir,{recursive:true});
  const files = fileNames[p.slug] ?? names;
  files.forEach((name,index)=>writeFileSync(join(dir,`${name}.svg`),svg(p,index),"utf8"));
}
const social = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#fff"/><rect x="735" width="465" height="630" fill="#EC1D25"/><path d="M820 120h160v75h90v250H950v75H805l15-75H700V210h105z" fill="#fff"/><g font-family="Arial,Helvetica,sans-serif" fill="#0A0A0A"><text x="64" y="118" font-size="28" font-weight="700">ABOUND CREATION</text><text x="64" y="330" font-size="94" font-weight="900" letter-spacing="-6">ABOUND WITH</text><text x="64" y="420" font-size="94" font-weight="900" letter-spacing="-6" fill="#EC1D25">CREATIVE IDEA.</text><text x="68" y="535" font-size="22">BRANDING / DESIGN / MARKETING / VISUAL CONTENT</text></g></svg>`;
writeFileSync(join("public","social-card.svg"),social,"utf8");
