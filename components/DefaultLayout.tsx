import { Navbar } from "./Navbar";

export const DefaultLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />

      <div className="min-h-screen">{children}</div>
    </>
  );
};
