import Image from "next/image";

export default function Logo() {
  return (
    <>
      <Image src='/logo.svg' alt="Logo cashTrackr" width={400} height={123} priority/>
    </>
  );
};