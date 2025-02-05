import { api } from "@/trpc/server";
import InfoOverview from "./_components/infos";

export default async function Page() {
  await api.info.getAll.prefetch();

  return <InfoOverview />;
}
