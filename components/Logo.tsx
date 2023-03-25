import Image from "next/image";

export function Logo() {
  return (
    <>
      <Image src="/images/logo.svg" alt="" width={32} height={32} />

      <div className="ml-2 flex flex-col">
        <p className="font-assistant text-lg font-extrabold leading-[0.75] tracking-tight text-heading">
          JS Garden
        </p>

        <p className="mt-1 font-mono text-[10px] uppercase leading-none text-text-alt">
          Thomas Cazade
        </p>
      </div>
    </>
  );
}
