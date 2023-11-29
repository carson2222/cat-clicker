import catWhite from "./images/cat_White.png";
import catBlack from "./images/cat_Black.png";
import catGinger from "./images/cat_Ginger.png";
import catBrown from "./images/cat_Brown.png";

const skinsData = [
  {
    id: 1,
    name: "white",
    path: catWhite,
    available: true,
    bgColor: "white",
  },
  {
    id: 2,
    name: "black",
    path: catBlack,
    available: false,
    bgColor: "#4d4d4d",
  },
  {
    id: 3,
    name: "ginger",
    path: catGinger,
    available: false,
    bgColor: "#fc7f03",
  },
  {
    id: 4,
    name: "brown",
    path: catBrown,
    available: false,
    bgColor: "#633200",
  },
];
export default skinsData;
