import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className="fixed w-screen h-screen bg-black opacity-70 top-0 left-0 z-40">
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <span className={styles.loader}></span>
      </div>
    </div>
  );
};

export default Loader;
