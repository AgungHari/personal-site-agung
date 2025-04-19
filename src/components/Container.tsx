import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { cn, scrollTo } from "@/lib/utils";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Preloader from "@/components/Preloader";
import styles from "@/styles/Container.module.css";
import { SunIcon, MoonIcon, BrainCircuit, BookA, Linkedin} from "lucide-react";
import { Home, Info, Users, Mail, Database, Code, GitHub} from "react-feather";


type IconProps = {
  ["data-hide"]: boolean;
};

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  description?: string;
  className?: string;
};

type NavProps = {
  text: string;
  href: string;
  i: number;
  className?: string;
};

const variants = {
  visible: (i: number) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
    },
  }),
  hidden: { opacity: 0 },
};

const navLinks = [
  { href: "#home", text: "Home", icon: <Home className="w-4 h-4" /> },
  { href: "#about",  text: "About", icon: <Info className="w-4 h-4" /> },
  { href: "#projects",  text: "Projects", icon: <Code className="w-4 h-4" /> },
  { href: "#mentors",  text: "Mentors", icon: <Users className="w-4 h-4" /> },
  { href: "#contact",  text: "Contact", icon: <Mail className="w-4 h-4" /> },
  { href: "#bemydataset",  text: "Be My Dataset", icon: <Database className="w-4 h-4" /> },
  { href: "#trymymodel",  text: "Try My Model", icon: <BrainCircuit className="w-4 h-4" /> },
  { href: "/ilmu-mahal", text: "Blog (Update!)",
    icon: (
      <div className="relative w-4 h-4">
        <BookA className="w-4 h-4" />
        <span className="absolute bottom-0 left-0 block h-1.5 w-1.5 rounded-full bg-red-500 border border-background animate-blink" />
      </div> ),
  },  
  { href: "https://www.linkedin.com/in/i-gusti-ngurah-agung-hari-vijaya-kusuma", text : "Visit My LinkedIn", icon : <Linkedin className="w-4 h-4"/>},
  { href: "https://github.com/AgungHari", text : "Visit My Github", icon : <GitHub className="w-4 h-4"/>},
];

function TypingEffect({ isDarkMode }: { isDarkMode: boolean }) {
  const [currentText, setCurrentText] = useState("");
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  useEffect(() => {
    setCurrentText("");
    setIndex(0);
    setIsDeleting(false);
    setLoopNum(0);
    setTypingSpeed(150);
  }, [isDarkMode]);

  useEffect(() => {
    const textArray = ["AgungHar!  " , "agungg.com  " , "github.com/AgungHari  ", "HariVijaya  ", "B300 M-IoT. ", "Info  "];
    const typingTimer = setTimeout(() => {
      const fullText = textArray[loopNum % textArray.length] ?? ""; 
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, index + 1));
        setIndex(index + 1);
        setTypingSpeed(110); //typing speed
      } else {
        setCurrentText(fullText.substring(0, index - 1));
        setIndex(index - 1);
        setTypingSpeed(90); // deleting speed
      }

      if (!isDeleting && currentText === fullText) {
        setIsDeleting(true);
        setTypingSpeed(1000); // delay before deleting
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setIndex(0);
        setTypingSpeed(150); // delay before typing new text
      }
    }, typingSpeed);

    return () => clearTimeout(typingTimer);
  }, [currentText, isDeleting, typingSpeed, loopNum, index]);

  return (
    <motion.div
      className="text-base font-medium typing-effect"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <span>{currentText}</span>
      <span className="blinking-cursor">|</span>
    </motion.div>
  );
}

function handleClick(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
  const href = e.currentTarget.getAttribute("href");

  if (!href) return;

  if (href.startsWith("#")) {
    e.preventDefault();

    if (window.location.pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }

    const section = document.querySelector(href);
    if (section) {
      scrollTo(section);
    }
  }
}

function NavItem(props: NavProps & { icon: JSX.Element; isMobile?: boolean }) {
  return (
    <motion.li
      className={`${props.className} ${props.isMobile ? "flex items-center space-x-4" : "relative group"}`}
      variants={variants}
      custom={props.i}
      initial="visible"
      whileHover={{
        y: 5, 
      }}
      transition={{
        type: "spring", // Transisi spring untuk kesan elastis
        stiffness: 300,
        damping: 15,
      }}
    >
      <a
        href={props.href}
        onClick={handleClick}
        className={`nav-link flex ${props.isMobile ? "items-center" : "justify-center"}`}
      >
        {props.icon}
        {props.isMobile && <span className="text-base font-medium ml-2">{props.text}</span>}
      </a>
      {!props.isMobile && (
        <span className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 hidden w-max rounded bg-gray-800 px-2 py-1 text-xs text-yellow-300 opacity-0 group-hover:block group-hover:opacity-90">
          {props.text}
        </span>
      )}
    </motion.li>
  );
}


export default function Container(props: ContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // State untuk dark mode
  const { children, ...customMeta } = props;
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();
  const meta = {
    title: "AgungHar!",
    description: `Fresh Graduate Computer Engineering Student.`,
    image: "/assets/logo.svg",
    type: "website",
    ...customMeta,
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // preloader effect
  useEffect(() => {
    if (router.pathname === "/") {
      setTimeout(() => {
        setHasMounted(true);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 2000); // tetap pakai delay 2 detik
    } else {
      setHasMounted(true);
    }
  }, [router.pathname]);

  const isFirstLoadHomepage = router.pathname === "/" && !hasMounted;

  useEffect(() => {
    const resetCursor = () => {
      document.body.style.cursor = "default";
    };

    router.events.on("routeChangeComplete", resetCursor);
    return () => {
      router.events.off("routeChangeComplete", resetCursor);
    };
  }, [router]);

  // Handle dark mode toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta name="theme-color" content="#0D1E26" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={`https://www.agungg.com${router.asPath}`}
        />
        <link
          rel="canonical"
          href={`https://www.agungg.com${router.asPath}`}
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="I Gusti Ngurah Agung Hari Vijaya Kusuma" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="I Gusti Ngurah Agung Hari Vijaya Kusuma" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </Head>
      <nav
        className={cn(
          styles.nav,
          isScrolled
            ? "bg-gradient-to-br from-background to-transparent shadow-md backdrop-blur transition"
            : "bg-transparent",
        )}
      >
        <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
              styles.burger,
              "inline-flex transform items-center justify-center rounded-md p-2 transition-all duration-300 focus:outline-none",
            )}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon data-hide={isOpen} />
            <CrossIcon data-hide={!isOpen} />
          </button>
        </div>
        <Link href="/">
          <motion.div
            className="text-lg font-semibold hover-effect w-[0px] whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{
              scale: 1.2,
              rotate: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            whileTap={{ scale: 0.9 }}
          >
            <TypingEffect isDarkMode={isDarkMode} />
          </motion.div>
        </Link>
        {/* Desktop menu */}
        <ul className={styles["desktop-nav"]}>
          {navLinks.map((link, i) => (
            <NavItem
              key={link.href}
              href={link.href}
              text={link.text}
              icon={link.icon}
              i={i}
              className="text-base"
              isMobile={false} // Desktop menu
            />
          ))}
        </ul>
        {/* Tombol toggle dark mode */} 
        <button
            onClick={toggleTheme}
            className="hidden p-1 bg-gray-200 rounded-full dark:bg-gray-700 transition-colors sm:flex"
          >
            {isDarkMode ? <MoonIcon className="h-5 w-5 text-yellow-400 " /> : <SunIcon className="h-5 w-5 text-gray-800 " /> }
        </button>

        {/* Mobile menu */}
        <AnimatePresence key="menu">
          {isOpen && (
            <motion.div
              className="fixed right-0 top-0 z-40 flex h-screen w-full flex-col justify-start overflow-y-hidden bg-background/95"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 1, type: "spring", bounce: 0.25 }}
            >
              {/* Expandable menu */}
              <div className="flex h-20 max-h-20 min-h-[60px] w-full items-center justify-between border-b pl-[22px] pr-1">
                <span className="text-base font-medium w-[0px]">Menu</span>
                <div className="flex pr-[30px]">
                  <button
                    onClick={toggleTheme}
                    className="p-1 bg-gray-200 rounded-full dark:bg-gray-700 transition-colors"
                  >
                    {isDarkMode ? <MoonIcon className="h-4 w-4 text-yellow-400" /> : <SunIcon className="h-4 w-4 text-gray-800" />}
                  </button>
                  </div>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className={styles.burger}
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open main menu</span>
                  <CrossIcon data-hide={!isOpen} />
                </button>
              </div>
              <div className="flex h-full flex-col items-start justify-between overflow-y-auto">
                {/* Links */}
                <ul className="flex min-h-fit w-full flex-col items-start space-y-6 px-[22px] py-[58px]">
                  {navLinks.map((link, i) => (
                    <button key={link.href} onClick={() => setIsOpen(false)}>
                      <NavItem
                        href={link.href}
                        text={link.text}
                        icon={link.icon}
                        i={i}
                        className="text-xl"
                        isMobile={true} // Mobile menu
                      />
                    </button>
                  ))}
                </ul>
                {/* Footer */}
                <div className="flex min-h-fit w-full flex-col space-y-8 px-[22px] py-10">
                  <span className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} AgungHari. All rights reserved.
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <style jsx global>{`
          html,
          body {
            overflow-y: ${isOpen ? "hidden" : "initial"};
            scrollbar-width: ${isOpen ? "none" : "unset"};
            -ms-overflow-style: ${isOpen ? "none" : "unset"};
            touch-action: ${isOpen ? "none" : "unset"};
            -ms-touch-action: ${isOpen ? "none" : "unset"};
          }
        `}</style>
      </nav>
      {/* Preloader */}
      <AnimatePresence mode="wait">
      {isFirstLoadHomepage && <Preloader />}
      </AnimatePresence>

      {/* Main content */}
      <main className={cn("container", props.className)}>{children}</main>
      <Footer />
    </>
  );
}

function MenuIcon(props: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute h-5 w-5 text-neutral-200"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 2.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CrossIcon(props: IconProps) {
  return (
    <svg
      className="absolute h-5 w-5 text-neutral-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
