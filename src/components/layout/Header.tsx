import { Link } from "@tanstack/react-router";

export default function Header() {
  return (
    <header className="h-[48px] fixed top-0 right-0 left-0 flex justify-between">
      <nav className="flex flex-row">
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>
      </nav>
    </header>
  );
}
