/**
 * Wraps every page and re-mounts on each navigation, so each new page eases
 * in with a short fade and lift (lk.css `.lk-enter`). Pure CSS, no state:
 * nothing re-renders beyond what the navigation already renders.
 */
export default function Template({ children }: { children: React.ReactNode }) {
	return <div className="lk-enter">{children}</div>;
}
