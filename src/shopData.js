import catFishingRod from "./images/cat_fishing-rod.png";
import catBuilder from "./images/cat_builder.png";
import catHouse from "./images/cat_house.png";
import catFarmer from "./images/cat_farmer.png";
import catWarrior from "./images/cat_warrior.png";
import catDriver from "./images/cat_driver.png";

const upgradesData = [
  {
    id: "1",
    type: "upgrades",
    upgradeId: "fisherCat",
    title: "Fishercat",
    description: "Each upgrade gives you + 0.05x CPS",
    initPrice: 20,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [0.05, 0.1, 0.15],
    img: catFishingRod,
  },
  {
    id: "2",
    type: "upgrades",
    upgradeId: "builder",
    title: "Builders",
    description: "Each upgrade gives you + 0.1x CPS ",
    initPrice: 100,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [0.1, 0.2, 0.3],
    img: catBuilder,
  },
  {
    id: "3",
    type: "upgrades",
    upgradeId: "catHouse",
    title: "Cat house",
    description: "Each upgrade gives you + 0.25x CPS ",
    initPrice: 500,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [0.25, 0.4, 0.6],
    img: catHouse,
  },
  {
    id: "4",
    type: "upgrades",
    upgradeId: "farmer",
    title: "Farmer",
    description: "Each upgrade gives you + 0.5x CPS ",
    initPrice: 2500,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [0.5, 0.75, 1],
    img: catFarmer,
  },
  {
    id: "5",
    type: "upgrades",
    upgradeId: "driver",
    title: "Driver",
    description: "Each upgrade gives you + 1x CPS ",
    initPrice: 10000,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [1, 1.5, 2],
    img: catWarrior,
  },
  {
    id: "6",
    type: "upgrades",
    upgradeId: "warrior",
    title: "Warrior",
    description: "Each upgrade gives you + 2.5x CPS ",
    initPrice: 50000,
    price: null,
    level: 0,
    cm: [0, 0, 0],
    xpm: [0, 0, 0],
    cps: [2.5, 5, 7.5],
    img: catDriver,
  },
];

const itemsData = {
  // {
  //   "mainCat": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "fisherCat": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "builder": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "catHouse": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "farmer": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "driver": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   },
  //   "warrior": {
  //     "1": false,
  //     "2": false,
  //     "3": false
  //   }
  // }
  mainCat: [
    {
      id: "1",
      type: "items",
      title: "Black skin",
      description: "Upgrade into black cat",
      price: 1,
      purchased: false,
    },
    {
      id: "2",
      type: "items",
      title: "Ginger skin",
      description: "Upgrade into ginger cat",
      price: 1,
      purchased: false,
    },
    {
      id: "3",
      type: "items",
      title: "Brown skin",
      description: "Upgrade into brown cat",
      price: 1,
      purchased: false,
    },
  ],
  fisherCat: [
    {
      id: "1",
      type: "items",
      title: "fisher cat test1",
      description: "Test",
      price: 1,
      purchased: false,
    },
    {
      id: "2",
      type: "items",
      title: "fisher cat test2",
      description: "Test",
      price: 1,
      purchased: false,
    },
    {
      id: "3",
      type: "items",
      title: "fisher cat test3",
      description: "Test",
      price: 1,
      purchased: false,
    },
  ],
};

export { upgradesData, itemsData };
