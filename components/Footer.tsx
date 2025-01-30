export default function Footer() {
  return (
    <footer className="bg-black border-t mt-auto">
      <div className="max-w-7xl mx-auto py-6 px-4">
        <p className="text-center text-white">
          {new Date().getFullYear()} Comforty. All rights reserved.
        </p>
      </div>
    </footer>
  );
}