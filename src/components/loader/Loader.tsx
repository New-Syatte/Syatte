const Loader = () => {
  return (
    <div className="fixed w-screen h-screen bg-black opacity-70 top-0 left-0 z-40">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <span className="w-3 h-3 rounded-full block m-auto relative bg-black box-border animate-pulse" />
      </div>
    </div>
  );
};

export default Loader;
