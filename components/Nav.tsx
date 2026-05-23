import NavClient from "./NavClient";
import { getHeader } from "@/lib/content/reader";

export default async function Nav() {
  const header = await getHeader();
  return <NavClient header={header} />;
}
