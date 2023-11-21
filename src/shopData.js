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
    cm: 0,
    xpm: 0,
    cps: 0.05,
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
    cm: 0,
    xpm: 0,
    cps: 0.1,
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
    cm: 0,
    xpm: 0,
    cps: 0.25,
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
    cm: 0,
    xpm: 0,
    cps: 0.5,
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
    cm: 0,
    xpm: 0,
    cps: 1,
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
    cm: 0,
    xpm: 0,
    cps: 2.5,
  },
];

const itemsData = {
  mainCat: [
    {
      id: "1",
      type: "items",
      title: "Black skin",
      description: "Upgrade into black cat",
      price: 1,
      cm: 2,
      xpm: 0,
      cps: 0,
      purchased: false,
    },
    {
      id: "2",
      type: "items",
      title: "Ginger skin",
      description: "Upgrade into ginger cat",
      price: 1,
      cm: 5,
      xpm: 0,
      cps: 0,
      purchased: false,
    },
    {
      id: "3",
      type: "items",
      title: "Brown skin",
      description: "Upgrade into brown cat",
      price: 1,
      cm: 10,
      xpm: 0,
      cps: 0,
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
      cm: 0,
      xpm: 0,
      cps: 0,
      purchased: false,
    },
    {
      id: "2",
      type: "items",
      title: "fisher cat test2",
      description: "Test",
      price: 1,
      bonusType: "cm",
      bonusAmount: 5,
      purchased: false,
    },
    {
      id: "3",
      type: "items",
      title: "fisher cat test3",
      description: "Test",
      price: 1,
      bonusType: "cm",
      bonusAmount: 10,
      purchased: false,
    },
  ],
};

export { upgradesData, itemsData };
