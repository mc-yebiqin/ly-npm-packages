import React, { ReactNode } from "react";
import classnames from "classnames";

import styles from "./index.module.scss";

interface ButtonProps extends React.AllHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  [others: string]: any;
}
const ActionButton = ({ children, className, ...others }: ButtonProps) => {
  return (
    <div className={classnames(styles.action_button, className)} {...others}>
      {children}
    </div>
  );
};

export default ActionButton;
