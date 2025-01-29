export const SHOWCASES: ShowcaseConfig = {
  "0 – On-Premises": {
    baseUrl: "http://todo.invalid",
  },
  "1 – Lift & Shift": {
    baseUrl: "https://proxy.cloud.workshop.openknowledge.services",
    // Add target IP of EC2 instance or dns entry of your load balancer
    // without any protocol or path
    targetHost: "todo.invalid",
  },
  "2 – Managed Services": {
    baseUrl: "http://todo.invalid",
  },
  "3 – PaaS": {
    baseUrl: "http://todo.invalid",
  },
  "4 – Lambda": {
    baseUrl: "http://todo.invalid",
  },
};

type ShowcaseConfig = Record<string, SimpleShowcase | Showcase>;

interface SimpleShowcase {
  baseUrl: string;
  targetHost?: string;
}

interface Showcase {
  categoryBaseUrl: string;
  topicBaseUrl: string;
  postBaseUrl: string;
  targetHost?: string;
}

export const getShowcase = (showcaseName: string): Showcase => {
  const rawShowcase = SHOWCASES[showcaseName];

  if ("baseUrl" in rawShowcase) {
    const baseUrl = new URL(rawShowcase.baseUrl);

    const categoryBaseUrl = new URL("/categories", baseUrl).toString();
    const topicBaseUrl = new URL("/topics", baseUrl).toString();
    const postBaseUrl = new URL("/posts", baseUrl).toString();

    let currentShowcase: Showcase = {
      categoryBaseUrl,
      topicBaseUrl,
      postBaseUrl,
    };

    if ("targetHost" in rawShowcase) {
      currentShowcase = {
        ...currentShowcase,
        targetHost: rawShowcase.targetHost,
      }
    }

    return currentShowcase;
  }
  return rawShowcase;
};

const LOCAL_STORAGE_KEY = "showcase";

export const getCurrentShowcaseName = () => {
  const showcaseName = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (showcaseName) {
    return showcaseName;
  }

  return Object.keys(SHOWCASES)[0];
};

export const getCurrentShowcase = () => {
  const showcaseName = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (showcaseName) {
    return getShowcase(showcaseName);
  }

  return SHOWCASES[0];
};

export const setCurrentShowcase = (showcaseName: string) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, showcaseName);

  window.location.reload();
};

export const CURRENT_SHOWCASE_NAME = getCurrentShowcaseName();

export const CURRENT_SHOWCASE = getShowcase(CURRENT_SHOWCASE_NAME);
