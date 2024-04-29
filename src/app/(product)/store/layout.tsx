const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="w-full mt-8 sm:mt-0 mx-auto mb-[200px] flex flex-col justify-around items-center overflow-x-hidden">
      <header className="w-full h-52 sm:mt-16 sm:mb-12 mb-[70px] flex justify-center items-center gap-44 relative">
        <div className="flex justify-center items-center flex-col text-center text-black">
          <h3 className="text-center sm:text-base text-2xl font-normal font-garamond">
            STORE
          </h3>
          <h1 className="sm:text-3xl text-[70px] sm:font-black font-bold font-helvetica">
            공식 스토어
          </h1>
        </div>
      </header>
      <section className="flex flex-col justify-center items-center w-full">
        {children}
      </section>
    </main>
  );
};
export default layout;
