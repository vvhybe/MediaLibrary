export default function useActivePage() {
  return  window.location.pathname.substring(1).toLowerCase() || "home";
}

