import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { MailIcon } from "lucide-react";

export default function Footer() {
  // get the current time in UTC+1 time zone
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const utcOffset = 8;
      date.setHours(date.getUTCHours() + utcOffset);
      setTime(
        date.toLocaleTimeString("en-ID", {
          hour12: true,
          hour: "numeric",
          minute: "numeric",
        }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex flex-row items-center justify-between py-6">
        <span className="flex flex-row items-center space-x-4">
          <p className="text-xs text-muted-foreground">
            Ver 0.9.3 by{" "}
            <Link
              href="https://github.com/AgungHari"
              target="_blank"
              passHref
              className="text-foreground transition hover:text-primary"
            >
              AgungHari
            </Link>
          </p>
          <hr className="hidden h-6 border-l border-muted md:flex" />
          <span className="flex hidden flex-row items-center space-x-2 md:flex">
            <p className="text-xs text-muted-foreground">Local time:</p>
            <p className="text-sm font-semibold">{time} UTC+8</p>
          </span>
        </span>
        <Link
          href="mailto:gungwahari2@gmail.com"
          passHref
          className="text-xs text-muted-foreground hover:text-foreground"
        >
          <Button variant={"outline"}>
            <MailIcon className="h-4 w-4 md:mr-2" />
            <span className="hidden md:flex">gungwahari2@gmail.com or tyang@agungg.com</span>
          </Button>
        </Link>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#fffc84,#7d8a42,#ffb75d,transparent)] opacity-50" />
    </footer>
  );
}
