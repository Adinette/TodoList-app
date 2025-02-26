export const ROUTES = {
  AUTH: {
    SIGNIN: "login",
    SIGNUP: "sign-up",
  },
  DASHBOARD: {
    ROOT: "todo",
  },
};

export const MODEL_KEY = {
  USERS: "user",
  TASKS: "task",
  STATUSTASKS: "taskStatus",
};

export const COOKIE_ATTRIBUTES = {
  TOKEN: "express_session",
};

export const TIMES = {
  DEBOUNCE_DELAY: 300,
};

export const headerLinks = [
  {
    name: "Accueil",
    route: "/",
  },
  {
    name: "A Propos",
    route: "/apropos",
  },
  {
    name: "Contacts",
    route: "/profile",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  location: "",
  imageUrl: "",
  startDateTime: new Date(),
  endDateTime: new Date(),
  categoryId: "",
  price: "",
  isFree: false,
  url: "",
};

export const CIVILITY = [
  {
    value: "M.",
    name: "Monsieur",
  },
  {
    value: "Mme.",
    name: "Madame",
  },
  {
    value: "Mlle.",
    name: "Mademoiselle",
  },
  {
    name: "Autre",
    value: "Autre",
  },
];

export const SEXS = [
  { name: "Masculin", value: "M" },
  { name: "féminin", value: "F" },
];

