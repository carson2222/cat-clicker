import catWhite from "./images/cat_white.png";
import catBlack from "./images/cat_black.png";
import catGinger from "./images/cat_ginger.png";
import catBrown from "./images/cat_brown.png";

const skinsData = [
  {
    name: "white",
    path: catWhite,
    available: true,
    bgColor: "white",
  },
  {
    name: "black",
    path: catBlack,
    available: false,
    bgColor: "#4d4d4d",
  },
  {
    name: "ginger",
    path: catGinger,
    available: false,
    bgColor: "#fc7f03",
  },
  {
    name: "brown",
    path: catBrown,
    available: false,
    bgColor: "#633200",
  },
];
export default skinsData;
