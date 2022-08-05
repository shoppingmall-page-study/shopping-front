let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendHost = "http://222.118.103.229:8080";
}

export const API_BASE_URL = `${backendHost}`;
