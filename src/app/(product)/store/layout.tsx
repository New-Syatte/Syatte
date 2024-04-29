const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="w-full mt-8 mx-auto mb-[200px] flex flex-col justify-around items-center">
      <header className="w-full h-52 mb-20 flex justify-center items-center gap-44 relative">
        <div className="flex justify-center items-center flex-col text-center text-black">
          <h3 className="text-center text-2xl font-normal font-garamond">
            STORE
          </h3>
          <h1 className="text-[70px] font-bold font-helvetica">공식 스토어</h1>
        </div>
      </header>
      <section className="flex flex-col justify-center items-center w-full">
        {children}
      </section>
    </section>
  );
};
export default layout;
