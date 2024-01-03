import SuccessPage from "../SuccssPage";
import Visual from "@/app/(home)/Visual";
import Intro from "@/app/(home)/Intro";
import Recommend from "@/app/(home)/Recommend";
import Story from "@/app/(home)/Story";
import RouteComplete from "@/utils/RouteComplete";

export default async function Home() {
  return (
    <RouteComplete>
      <main>
        <SuccessPage />
        <Visual />
        <Intro />
        <Recommend />
        <Story />
      </main>
    </RouteComplete>
  );
}
