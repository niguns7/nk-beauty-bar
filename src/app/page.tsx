import { getCatalog } from "@/lib/catalog";
import { HomeClient } from "@/components/HomeClient";

export const revalidate = 300;

export default async function HomePage() {
  const catalog = await getCatalog();

  return <HomeClient catalog={catalog} />;
}
