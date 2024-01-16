import EduProcessingCard from "@/app/(education)/education/EduProcessingCard";

export default function EduProcessing() {
  return (
    <section className={ "mx-auto w-[70vw] " }>
      <p className={ "text-[60px] font-bold text-center" }>진행중인 교육</p>
      <div className={ "divider mt-[116px]" } />
      <div className={ "mt-[48px]" } />
      <div className={ "flex flex-wrap w-[1200px] gap-[34px]" }>
        {/*// sanity data map*/ }
        <EduProcessingCard />
        <EduProcessingCard />
        <EduProcessingCard />
        <EduProcessingCard />
        <EduProcessingCard />
      </div>
    </section>
  );
}
