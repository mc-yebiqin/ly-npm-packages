import Store from "../store";
import { ViewTool } from "../../types";
import { nodeTheme } from "../../styles";
import { DomainState, ToolSlotFn } from "../types";

const initToolsStates = {
  slot: undefined,
  views: [],
  isOpen: false,
  activeTab: 0,
  // ------------------
  view: null,
  colorsMap: new Map(),
  selectNode: null,
  updateState: null,
};

class ToolsDomain extends Store<DomainState> {
  constructor(data: DomainState) {
    super(data);
  }

  addView(view: ViewTool) {
    this.set({ views: [...this.state.views, view] });
  }

  switchView(view?: ViewTool) {
    const { views } = this.state;

    const newView = view ?? views[0] ?? null;

    toolsDomain.set({
      view: newView,
      colorsMap: new Map(),
      selectNode: null,
      updateState: newView?.state || null,
    });
  }

  getNodeColor(type: string) {
    const { colorsMap } = this.state;
    const color = colorsMap.get(type);
    if (color) return color;

    const index = colorsMap.size % nodeTheme.length;
    const colorTheme = nodeTheme[index];
    colorsMap.set(type, colorTheme);
    return colorTheme;
  }

  destroyView(id: string) {
    const { views } = this.state;
    const newViews = views.filter((view) => view.id === id);
    this.set({ views: newViews });
    this.switchView(newViews[0]);
  }
}

export let ToolSlot: ToolSlotFn | null = null;

export const toolsDomain = new ToolsDomain(initToolsStates);

export const useToolsDomain = toolsDomain.use;
