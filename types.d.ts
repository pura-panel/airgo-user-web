interface ViewTransition {
  ready: Promise<void>;
}
interface Document {
  startViewTransition: (callback: () => void) => ViewTransition;
}
