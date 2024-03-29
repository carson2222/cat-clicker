import catFishingRod from "./images/cat_fishing-rod.png";
import catBuilder from "./images/cat_builder.png";
import catHouse from "./images/cat_house.png";
import catFarmer from "./images/cat_farmer.png";
import catWarrior from "./images/cat_warrior.png";
import catDriver from "./images/cat_driver.png";

const itemsData = [
  {
    id: "0",
    type: "items",
    itemId: "mainCat",
    level: 0,
    amount: 1,
    cm: [0, 1, 2, 3],
    xpm: [0, 1, 2, 3],
    cps: [0, 1, 2, 3],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "1",
    type: "items",
    itemId: "fisherCat",
    title: "Fishercat",
    description: "Each item gives you",
    initPrice: 20,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0.05, 0.065, 0.08, 0.095],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],

    img: catFishingRod,
    width: "auto",
    height: "50px",
    baseTop: 25,
    baseLeft: 5,
  },
  {
    id: "2",
    type: "items",
    itemId: "builder",
    title: "Builders",
    description: "Each item gives you",
    initPrice: 100,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0.1, 0.115, 0.13, 0.145],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
    img: catBuilder,
    width: "auto",
    height: "50px",
    baseTop: 45,
    baseLeft: 5,
  },
  {
    id: "3",
    type: "items",
    itemId: "catHouse",
    title: "Cat house",
    description: "Each item gives you",
    initPrice: 500,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0.25, 0.375, 0.5, 0.625],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
    img: catHouse,
    width: "auto",
    height: "50px",
    baseTop: 65,
    baseLeft: 5,
  },
  {
    id: "4",
    type: "items",
    itemId: "farmer",
    title: "Farmer",
    description: "Each item gives you",
    initPrice: 2500,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0.5, 0.75, 1, 1.25],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
    img: catFarmer,
    width: "auto",
    height: "50px",
    baseTop: 25,
    baseLeft: 75,
  },
  {
    id: "5",
    type: "items",
    itemId: "driver",
    title: "Driver",
    description: "Each item gives you",
    initPrice: 10000,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [1, 1.5, 2, 2.5],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
    img: catDriver,
    width: "auto",
    height: "50px",
    baseTop: 45,
    baseLeft: 75,
  },
  {
    id: "6",
    type: "items",
    itemId: "warrior",
    title: "Warrior",
    description: "Each item gives you",
    initPrice: 50000,
    price: null,
    level: 0,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [2.5, 3.5, 4.5, 5.5],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [0, 0, 0, 0, 0, 0, 0],
    img: catWarrior,
    width: "auto",
    height: "50px",
    baseTop: 65,
    baseLeft: 75,
  },
  {
    id: "7",
    type: "items",
    itemId: "maxStreak",
    level: 0,
    amount: 1,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0, 0, 0, 0],
    ms: [0.05, 0.15, 0.3, 0.4, 0.5, 0.7, 1],
    sch: [0, 0, 0, 0, 0, 0, 0],
  },
  {
    id: "8",
    type: "items",
    itemId: "streakChance",
    level: 0,
    amount: 1,
    cm: [0, 0, 0, 0],
    xpm: [0, 0, 0, 0],
    cps: [0, 0, 0, 0],
    ms: [0, 0, 0, 0, 0, 0, 0],
    sch: [5, 10, 15, 25, 35, 50, 65],
  },
];

const upgradesData = {
  mainCat: [
    {
      id: "1",
      type: "upgrades",
      title: "Black skin",
      description: "Upgrade into black cat",
      price: 500,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Ginger skin",
      description: "Upgrade into ginger cat",
      price: 2000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Brown skin",
      description: "Upgrade into brown cat",
      price: 5000,
      purchased: false,
    },
  ],
  fisherCat: [
    {
      id: "1",
      type: "upgrades",
      title: "Fisher Cat lvl 2",
      description: "Test",
      price: 150,
      purchased: true,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Fisher Cat lvl 3",
      description: "Test",
      price: 400,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Fisher Cat lvl 4",
      description: "Test",
      price: 1000,
      purchased: false,
    },
  ],
  builder: [
    {
      id: "1",
      type: "upgrades",
      title: "Builder lvl 2",
      description: "Test",
      price: 1000,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Builder lvl 3",
      description: "Test",
      price: 3000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Builder lvl 4",
      description: "Test",
      price: 7000,
      purchased: false,
    },
  ],
  catHouse: [
    {
      id: "1",
      type: "upgrades",
      title: "Cat House lvl 2",
      description: "Test",
      price: 5000,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Cat House lvl 3",
      description: "Test",
      price: 10000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Cat House lvl 4",
      description: "Test",
      price: 20000,
      purchased: false,
    },
  ],
  farmer: [
    {
      id: "1",
      type: "upgrades",
      title: "Farmer lvl 2",
      description: "Test",
      price: 15000,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Farmer lvl 3",
      description: "Test",
      price: 25000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Farmer lvl 4",
      description: "Test",
      price: 60000,
      purchased: false,
    },
  ],

  driver: [
    {
      id: "1",
      type: "upgrades",
      title: "Driver lvl 2",
      description: "Test",
      price: 50000,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Driver lvl 3",
      description: "Test",
      price: 100000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Driver lvl 4",
      description: "Test",
      price: 200000,
      purchased: false,
    },
  ],
  warrior: [
    {
      id: "1",
      type: "upgrades",
      title: "Warrior lvl 2",
      description: "Test",
      price: 175000,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Warrior lvl 3",
      description: "Test",
      price: 400000,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Warrior lvl 4",
      description: "Test",
      price: 100000000,
      purchased: false,
    },
  ],
  maxStreak: [
    {
      id: "1",
      type: "upgrades",
      title: "Max Streak 1",
      description: "Increase your click earning by keeping Streak",
      price: 100,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Max Streak 2",
      description: "Increase your click earning by keeping Streak",
      price: 500,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Max Streak 3",
      description: "Increase your click earning by keeping Streak",
      price: 1000,
      purchased: false,
    },
    {
      id: "4",
      type: "upgrades",
      title: "Max Streak 4",
      description: "Increase your click earning by keeping Streak",
      price: 5000,
      purchased: false,
    },
    {
      id: "5",
      type: "upgrades",
      title: "Max Streak 5",
      description: "Increase your click earning by keeping Streak",
      price: 20000,
      purchased: false,
    },
    {
      id: "6",
      type: "upgrades",
      title: "Max Streak 6",
      description: "Increase your click earning by keeping Streak",
      price: 50000,
      purchased: false,
    },
    {
      id: "7",
      type: "upgrades",
      title: "Max Streak 7",
      description: "Increase your click earning by keeping Streak",
      price: 100000,
      purchased: false,
    },
  ],
  streakChance: [
    {
      id: "1",
      type: "upgrades",
      title: "Streak Chance 1",
      description: "Increase your Streak earning speed",
      price: 100,
      purchased: false,
    },
    {
      id: "2",
      type: "upgrades",
      title: "Streak Chance 2",
      description: "Increase your Streak earning speed",
      price: 500,
      purchased: false,
    },
    {
      id: "3",
      type: "upgrades",
      title: "Streak Chance 3",
      description: "Increase your Streak earning speed",
      price: 1000,
      purchased: false,
    },
    {
      id: "4",
      type: "upgrades",
      title: "Streak Chance 4",
      description: "Increase your Streak earning speed",
      price: 5000,
      purchased: false,
    },
    {
      id: "5",
      type: "upgrades",
      title: "Streak Chance 5",
      description: "Increase your Streak earning speed",
      price: 20000,
      purchased: false,
    },
    {
      id: "6",
      type: "upgrades",
      title: "Streak Chance 6",
      description: "Increase your Streak earning speed",
      price: 50000,
      purchased: false,
    },
    {
      id: "7",
      type: "upgrades",
      title: "Streak Chance 7",
      description: "Increase your Streak earning speed",
      price: 100000,
      purchased: false,
    },
  ],
};

export { itemsData, upgradesData };
