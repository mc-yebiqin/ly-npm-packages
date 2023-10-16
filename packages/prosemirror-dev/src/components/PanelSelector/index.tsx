import React, { memo, useCallback, useEffect, useState } from "react";

import styles from "./index.module.scss";
import { toolsDomain, useToolsDomain } from "../../domain";

const PanelSelector = () => {
  const view = useToolsDomain((state) => state.view);
  const views = useToolsDomain((state) => state.views);

  const [visible, setVisible] = useState(false);

  const handleSelectOption = (e: any) => {
    const selectedId = e.target.id;
    const selectedView = views.find((view) => view.id === selectedId);
    toolsDomain.switchView(selectedView);
  };

  const handleToggleVisible = () => setVisible(!visible);

  const listenCloseEvt = useCallback(() => setVisible(false), []);

  useEffect(() => {
    if (visible) {
      window.addEventListener("mousedown", listenCloseEvt);
    } else {
      window.removeEventListener("mousedown", listenCloseEvt);
    }
  }, [visible]);

  return (
    <div className={styles.selector}>
      <div className={styles.selector_value} onMouseDown={handleToggleVisible}>
        {view ? (
          <span className={styles.selected_id}>编辑器{view.id}</span>
        ) : (
          <span className={styles.selected_empty}>请选择编辑器</span>
        )}
      </div>

      {visible && (
        <div className={styles.selector_options} onMouseDownCapture={handleSelectOption}>
          {views?.map(({ id }) => (
            <div
              className={styles.option_item}
              key={id}
              data-id={id}
              data-active={view?.id === id}
            >
              编辑器{id}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default memo(PanelSelector);
