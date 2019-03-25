// All of the static data are subject to
// future modification, e.x to be retrieved from the server
const sidebars = {
  sidebar_left: {
    colorPallete: "color-pallete4",
    position: "left",
    icon: "cog",
    options: [
      {
        name: "assistant_visibility",
        text: "Assistant",
        value: "toggle",
        property: "assistant_visibility",
        action: "modifyLayout",
        target: ""
      },
      {
        name: "change_transitions",
        text: "Change Transitions",
        value: "next",
        property: "transition",
        action: "modifyLayout",
        target: ""
      },
      {
        name: "change_layout",
        text: "Change Layout",
        value: 1,
        property: "transition",
        action: "modifyViewList",
        target: ""
      }
    ]
  },
  sidebar_right: {
    colorPallete: "color-pallete1",
    position: "right",
    icon: "user-circle",
    options: [
      {
        name: "favorites",
        text: "Favorites",
        value: "favorites",
        property: "transitions",
        action: "modifyViewList",
        target: ""
      }
    ]
  }
};

export default sidebars;
