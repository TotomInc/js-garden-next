import { Navbar } from "../components/Navbar";

export const BlogLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <Navbar />

      <div className="mx-auto min-h-screen max-w-3xl px-6 py-24 lg:py-32">
        {children}
      </div>
    </>
  );
};
