import { Navbar } from "../components/Navbar";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />

      <div className="mx-auto min-h-screen max-w-5xl px-6 py-24 lg:py-32">
        {children}
      </div>
    </>
  );
};
