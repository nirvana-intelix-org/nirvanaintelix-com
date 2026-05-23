import HeroClient from "./HeroClient";
import { getHero, getProjects } from "@/lib/content/reader";

export default async function Hero() {
  const [hero, projects] = await Promise.all([getHero(), getProjects()]);
  const liveProducts = projects.items.map((p) => ({
    name: p.title,
    tag: p.tag,
    swatch: p.swatch,
    flag: !!p.flagship,
  }));
  return <HeroClient hero={hero} liveProducts={liveProducts} />;
}
