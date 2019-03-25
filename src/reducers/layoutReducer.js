import { FETCH_LAYOUT_DATA, MODIFY_LAYOUT } from "../actions/types";

const initialState = {
  layout: {},
  sidebars: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_LAYOUT_DATA:
      //get static data for layout
      return {
        ...state,
        layout: action.payload.layout,
        sidebars: action.payload.sidebars
      };
    case MODIFY_LAYOUT:
      // check for special cases
      let newValue;
      switch (action.payload.value) {
        case "next": {
          newValue =
            (state.layout[action.payload.property] + 1) %
            state.layout[action.payload.property + "_list"].length;
          break;
        }
        case "toggle": {
          state.layout[action.payload.property] === 1
            ? (newValue = 0)
            : (newValue = 1);
          break;
        }
        default: {
          newValue = action.payload.value;
          break;
        }
      }
      // set layout's property
      return {
        ...state,
        layout: {
          ...state.layout,
          [action.payload.property]: newValue
        }
      };
    default:
      return state;
  }
}
