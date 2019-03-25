// All of the static data are subject to
// future modification, e.x to be retrieved from the server
const layout = {
  active_frame: "",
  transition: 0,
  transition_list: ["", "fade-"],
  navbar: {
    options: [
      {
        name: "home",
        text: "Home",
        action: "openLink",
        value: "",
        target: ""
      },
      {
        name: "github",
        text: "GitHub",
        action: "openLink",
        value: "https://github.com/VasilisKalaitzis/movieSpot",
        target: "_blank"
      }
    ]
  },
  assistant_visibility: 0,
  assistant_roaming: 0
};

export default layout;
