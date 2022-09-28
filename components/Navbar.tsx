import Image from "next/image";

export const Navbar: React.FC = () => {
  return (
    <header className="w-full py-4">
      <div className="mx-auto flex max-w-[93ch]">
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
