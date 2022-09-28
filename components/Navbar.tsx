import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-background bg-opacity-80 py-4 backdrop-blur-md backdrop-filter">
      <div className="relative mx-auto flex max-w-[768px] px-6">
        <div />

        <div className="flex items-center justify-center">
          <Image src="/images/logo.svg" alt="" width={32} height={32} />

          <p className="ml-2 font-assistant text-2xl font-black text-slate-100">
            JS Garden
          </p>
        </div>
      </div>
    </header>
  );
};
