import React, { memo } from "react";
import { toolsDomain, useToolsDomain } from "../domain";

const EditorViewSelector = () => {
  const views = useToolsDomain((state) => state.views);

  const mountedRef = (element: any) => {
    handleUpdateOption(element);
  };

  const handleChangeEvt = (e: any) => {
    handleUpdateOption(e.target);
  };

  const handleUpdateOption = (target: HTMLSelectElement) => {
    if (!target) return;
    const [option] = target.selectedOptions;
    const optionId = Number(option.value);
    const findView = views.find((view) => view.id === optionId);
    if (findView) toolsDomain.switchView(findView);
  };

  return (
    <select ref={mountedRef} onChange={handleChangeEvt}>
      {views?.map((view) => (
        <option key={view.id} value={view.id}>
          编辑器{view.id}
        </option>
      ))}
    </select>
  );
};

export default memo(EditorViewSelector);
