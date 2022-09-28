import { Navbar } from "./Navbar";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />

      <div className="mx-auto min-h-screen max-w-7xl px-6 pt-16 lg:pt-24">
        {children}
      </div>
    </>
  );
};
