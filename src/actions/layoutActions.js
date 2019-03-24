import { FETCH_LAYOUT_DATA, MODIFY_LAYOUT } from "./types";

import layout from "../static_data/layout";
import sidebars from "../static_data/sidebars";

export const fetchLayoutData = () => dispatch => {
  dispatch({
    type: FETCH_LAYOUT_DATA,
    payload: {
      layout: layout,
      sidebars: sidebars
    }
  });
};

export const modifyLayout = (property, value) => dispatch => {
  dispatch({
    type: MODIFY_LAYOUT,
    payload: {
      property: property,
      value: value
    }
  });
};
