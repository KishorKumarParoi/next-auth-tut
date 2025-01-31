import Navbar from "./_components/Navbar";

interface ProtectedlayoutProps {
  children: React.ReactNode;
}
const Protectedlayout = ({ children }: ProtectedlayoutProps) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-y-10 bg-gradient-to-b from-sky-400 to-blue-800 ">
      <Navbar />
      {children}
    </div>
  );
};

export default Protectedlayout;
