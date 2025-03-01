export const ROUTES = {
  AUTH: {
    SIGNIN: "login",
    SIGNUP: "sign-up",
  },
  DASHBOARD: {
    ROOT: "task-list",
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
    name: "Mes tâches",
    route: "/task-list",
  },
  {
    name: "Mon tableau de bord",
    route: "/task-dashboard",
  },
];

export const eventDefaultValues = {
  title: "",
  description: "",
  startDate: new Date(),
  endDate: new Date(),
  status: "",
};

