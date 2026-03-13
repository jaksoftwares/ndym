import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 180, height = 60, className = "" }: LogoProps) {
  return (
    <Link href="/" className={`inline-block ${className}`}>
      <Image
        src="/NDYM-LOGO.jpeg"
        alt="NDYM Logo"
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </Link>
  );
}
