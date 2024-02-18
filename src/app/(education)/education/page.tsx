import TopBanner from "@/app/(education)/education/TopBanner";
import EduProcessing from "@/app/(education)/education/EduProcessing";
import { getEdu } from "@/services/sanity/education";
import RouteComplete from "@/utils/RouteComplete";
import { Edu } from "@/model/edu";
import EducationCard from "@/app/(education)/education/EducationCard";
import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";
import EduSection from "@/app/(education)/education/EduSection";

export default async function Page() {
  const edu: Edu[] = await getEdu();
  return (
    <RouteComplete>
      <TopBanner />
      <EduSection />
    </RouteComplete>
  );
}
