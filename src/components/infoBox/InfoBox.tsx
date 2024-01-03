import React from "react";
import styles from "./InfoBox.module.scss";

interface IInfoBoxProps {
  cardClass: string;
  title: string;
  count: string;
  icon: React.JSX.Element;
}

const InfoBox = ({ cardClass, title, count, icon }: IInfoBoxProps) => {
  return (
    <div className={styles.infoBox}>
      <div className={cardClass}>
        <h4>{title}</h4>
        <span>
          <h3>{count}</h3>
          {icon}
        </span>
      </div>
    </div>
  );
};

export default InfoBox;
