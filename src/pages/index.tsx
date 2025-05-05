import Container from "@/components/Container";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

const aboutStats = [
  { label: "Years of experience", value: "2+" },
  { label: "Projects", value: "10+" },
];

type AskResponse = {
  answer: string;
};


const projects = [
  {
    title: "Smart Wheelchair Control Based on Spatial Features of Hand Gesture (CNN)",
    description: "Smart Wheelchair Control Based on Spatial Features of Hand Gesture (CNN)",
    image: "/assets/CNN.webm",
    href: "https://github.com/AgungHari/Smart-Wheelchair-Control-Based-on-Spatial-Features-of-Hand-Gesture",
  },
  {
    title: "Development of YOLOV8 based Autonomous Wheelchair for Obstacle Avoidance",
    description: "Development of YOLOV8 based Autonomous Wheelchair for Obstacle Avoidance",
    image: "/assets/TA_AGUNG.webm",
    href: "https://github.com/AgungHari/Development-of-YOLOV8-based-Autonomous-Wheelchair-for-Obstacle-Avoidance",
  },
  {
    title: "Wheelchair Control System Using Invisible Steering Gesture Based on LSTM",
    description: "Wheelchair Control System Using Invisible Steering Gesture Based on LSTM",
    image: "/assets/HAND_LSTM.webm",
    href: "https://github.com/AgungHari/Wheelchair-Control-System-Using-Invisible-Steering-Gesture-Based-on-LSTM",
  },
  {
    title: "Wheelchair Control System Based on SIBI Gesture with Smart Braking System using YOLOv11 and LSTM",
    description: "Wheelchair Control System Based on SIBI Gesture with Smart Braking System using YOLOv11 and LSTM",
    image: "/assets/AUTO_BRAKING.webm",
    href: "https://github.com/AgungHari/Wheelchair-Control-System-Based-on-SIBI-Gesture-with-Smart-Braking-System-using-YOLOv11-and-LSTM",
  },
  {
    title: "Development of a Wheelchair Control System Based on Face Gesture Recognition with LSTM",
    description: "Development of a Wheelchair Control System Based on Face Gesture Recognition with LSTM",
    image: "/assets/FACE_LSTM.webm",
    href: "https://github.com/AgungHari/Development-of-a-Wheelchair-Control-System-Based-on-Face-Gesture-Recognition-with-LSTM",
  },
  {
    title: "Forecasting USDCHF in Forex with LSTM",
    description: "Forecasting USDCHF in Forex with LSTM",
    image: "/assets/USDCHF.webm",
    href: "https://github.com/AgungHari/Forecasting-USDCHF-in-Forex-with-LSTM?tab=readme-ov-file",
  },
  {
    title: "TinyBERT Enhanced Chat System for Mobile Legends",
    description: "TinyBERT Enhanced Chat System for Mobile Legends",
    image: "/assets/TINYBERT.webm",
    href: "https://github.com/AgungHari/TinyBERT-Enhanced-Chat-System-for-Mobile-Legends",
  },
  {
    title: "Proglan NAZI PROJECT TANK",
    description: "Proglan NAZI PROJECT TANK",
    image: "/assets/TANK.webm",
    href: "https://github.com/AgungHari/Proglan-Game-Nazi-Project-Tank",
  },
  {
    title: "Universal ESP For Roblox",
    description: "Universal Script for Roblox",
    image: "/assets/ESPRBLX.webm",
    href: "https://github.com/AgungHari/Universal-ESP-For-Roblox",
  },
  {
    title: "YOLOv8 Based Human Tracking System for Autonomous Wheelchairs",
    description: "YOLOv8 Based Human Tracking System for Autonomous Wheelchairs",
    image: "/assets/TRACKING_YOLO.webm",
    href: "https://github.com/AgungHari/YOLOv8-Based-Human-Tracking-System-for-Autonomous-Wheelchairs",
  },
];

const services = [
  {
    service: "I Gusti Ngurah Bagus Kusuma Dewa, S.Si., Apt., MPPM.",
    description:
      "My father is the best mentor in my life, always providing me with valuable insights and answers. I have learned so much from him since childhood up to now.",
    image: "/assets/ajik.jpg",
  }, 
  {
    service: "Dr. Eko Mulyanto Yuniarno,S.T.,M.T.",
    description:
      "Pak Akok has provided me with the path to complete my education at Sepuluh Nopember Institute of Technology, guiding me from start to finish.",
    image: "/assets/ekomul.jpeg",
  },
  {
    service: "Teman-Teman B300",
    description:
      "My friends from B300 are the best partners I have ever had in my life. We have gone through so much together. Those experiences have taught me how to solve all kinds of problems.",
    image: "/assets/mentor3.jpg",
  },
  {
    service: "ChatGPT",
    description:
      "ChatGPT, it seems I dont need to explain at length. If you have money and had nothing to do with it, I will always recommend buying ChatGPT. Its ability to analyze code is undeniable! Even the website you are currently see was built with GPT.",
    image: "/assets/chatgpt.jpg",
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<{ question: string; think?: string; answer: string }[]>([]);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
  
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
  
      const raw: unknown = await res.json();
      const data: AskResponse = raw as AskResponse;
      const responseText: string = data.answer;
  
      let think: string | undefined;
      let answer: string = responseText;
  
      if (
        typeof responseText === "string" &&
        responseText.includes("<think>") &&
        responseText.includes("</think>")
      ) {
        const start: number = responseText.indexOf("<think>") + "<think>".length;
        const end: number = responseText.indexOf("</think>");
        think = responseText.slice(start, end).trim();
        answer = responseText.slice(end + "</think>".length).trim();
      }
  
      setMessages((prev) => [...prev, { question: query, think, answer }]);
      setQuery("");
    } catch (error) {
      console.error("Gagal mengambil respons:", error);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Fungsi untuk memulai kamera
  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);

      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.srcObject = mediaStream;
        videoElement.classList.remove("hidden");
      }
    } catch (error) {
      console.error("Gagal mengakses kamera:", error);
    }
  };
  
  // Fungsi untuk menangkap foto
  const capturePhoto = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;

    if (videoElement && canvasElement) {
      const context = canvasElement.getContext("2d");
      if (context) {
        // Sesuaikan ukuran canvas dengan video
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        // Gambar frame dari video ke dalam canvas
        context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

        // Tampilkan canvas dengan hasil tangkapan gambar
        canvasElement.classList.remove("hidden");
      }
    }
  };

  const uploadCapturedPhoto = async () => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      // Konversi gambar di canvas menjadi Blob (file gambar)
      canvasElement.toBlob((blob) => {
        if (blob) {
          void (async () => {
            const formData = new FormData();
            formData.append('file', blob, 'captured-photo.jpg');
  
            const response = await fetch('/api/upload', {
              method: 'POST',
              body: formData,
            });
  
            if (response.ok) {
              alert('Suksma!, Now we are officialy a team.');
            } else {
              alert('Cek koneksi atau hubungi agung via tyang@agungg.com');
            }
          })();
        }
      }, 'image/jpeg');
    }
  };
  useEffect(() => {
    setMessages([
      {
        question: "Hi Agung-R1 👋",
        think: "there is new visitor on Agungg.com. i must behave or Agung Hari will be mad. the visitor must know that agung hari doesnt pay me any money. i was running on his hp-dk1064tx laptop which is sucks.",
        answer: "Hi Im Agung-R1, freely ask me any question! I need some time to think please wait patiently while I think."
      }
    ]);
  }, []);
  
  
  // Hentikan kamera saat komponen di-unmount
  useEffect(() => {
    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [stream]);

  // handle scroll
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const scrollTarget = sessionStorage.getItem("scrollTarget");
    if (scrollTarget) {
      const section = document.getElementById(scrollTarget);
      if (section) {
        scrollTo(section);
        sessionStorage.removeItem("scrollTarget");
      }
    }
  }, []);
  

  useEffect(() => {
    if (!carouselApi) return;
  
    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
  
    // Auto scroll every 2 seconds
    const intervalId = setInterval(() => {
      const nextIndex = (carouselApi.selectedScrollSnap() + 1) % carouselApi.scrollSnapList().length;
      carouselApi.scrollTo(nextIndex);
    }, 2000);
  
    // Stop auto-scroll on user interaction
    const stopAutoScroll = () => {
      clearInterval(intervalId);
    };
  
    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  
    // Add event listeners for user interaction (click, touch)
    window.addEventListener('touchstart', stopAutoScroll);
    window.addEventListener('mousedown', stopAutoScroll);
  
    // Cleanup on unmount
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('touchstart', stopAutoScroll);
      window.removeEventListener('mousedown', stopAutoScroll);
    };
  }, [carouselApi]); // <-- Make sure this closing bracket is correctly placed
  

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              <div className="flex flex-wrap max-w-sm gap-1">
                <span className={styles.pill}>Python</span>
                <span className={styles.pill}>Tensorflow</span>
                <span className={styles.pill}>C/C++</span>
                <span className={styles.pill}>TypeScript</span>
                <span className={styles.pill}>NodeJS</span>
                <span className={styles.pill}>Tailwind</span>
                <span className={styles.pill}>LaTeX</span>
                <span className={styles.pill}>Firebase</span>
                <span className={styles.pill}>Vite</span>
                <span className={styles.pill}>React</span>
                <span className={styles.pill}>InfoLoker</span>
              </div>
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk animate-gradient-slide bg-gradient-to-r from-primary to-secondary bg-clip-text transition-colors duration-3000 text-6xl 2xl:text-8xl">
                  Agung Hari.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                I Gusti Ngurah <span className="text-red-500">Agung Hari</span> Vijaya Kusuma, Fresh Graduate Computer Engineering student with a strong interest in Artificial Intelligence (AI) and Machine Learning.
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Link href="https://github.com/AgungHari" passHref>
                <Button>
                  Get in touch <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => scrollTo(document.querySelector("#about"))}
              >
                Learn more
              </Button>
            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["video-container"]}
            className="mt-14 h-full w-full xl:mt-0"
          >
            <video
              src="/assets/video1.webm"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full rounded-lg"
            />

          </div>
        </section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-14 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <h2 className="py-16 pb-2 text-3xl font-light leading-normal tracking-tighter text-foreground xl:text-[40px]">
            I am a fresh graduate from{" "}
              <Link
                href="https://www.its.ac.id/"
                target="_blank"
                className="underline"
              >
                Institut Teknologi Sepuluh Nopember
              </Link>
              . with a strong interest in AI and machine learning.Currently, I am focused on developing my skills in computer vision, deep learning, and data analysis. I often use{" "}
              <Link
                href="https://www.python.org/"
                target="_blank"
                className="underline"
              >
                Python
              </Link>{" "}
              for the projects I work on. With a strong determination to keep learning and growing, I am always excited to try new things, such as building this website using{" "}
              <Link
                href="https://nextjs.org/"
                target="_blank"
                className="underline"
              >
                Next.js, Tailwind, and TypeScript
              </Link>
              . This project is one of my steps in personal development to master modern web technologies.
            </h2>
            <div className="grid grid-cols-2 gap-8 xl:grid-cols-3">
              {aboutStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center text-center xl:items-start xl:text-start"
                >
                  <span className="clash-grotesk text-gradient text-4xl font-semibold tracking-tight xl:text-6xl">
                    {stat.value}
                  </span>
                  <span className="tracking-tight text-muted-foreground xl:text-lg">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              Innovative AI and Machine Learning Projects.
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I have worked on various projects, ranging from an autonomous wheelchair control system based on computer vision to scripting for Roblox. You can view all my open-source project on GitHub. 
            </p>
            {/* Carousel */}
            <div className="mt-14">
              <Carousel setApi={setCarouselApi} className="w-full">
                <CarouselContent>
                  {projects.map((project) => (
                    <CarouselItem key={project.title} className="md:basis-1/2">
                      <Card id="tilt">
                        <CardHeader className="p-0">
                          <Link href={project.href} target="_blank" passHref>
                            {project.image.endsWith(".webm") ? (
                              <video
                                src={project.image}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            ) : (
                              <Image
                                src={project.image}
                                alt={project.title}
                                width={600}
                                height={300}
                                quality={100}
                                className="aspect-video h-full w-full rounded-t-md bg-primary object-cover"
                              />
                            )}
                          </Link>
                        </CardHeader>
                        <CardContent className="absolute bottom-0 w-full bg-background/50 backdrop-blur">
                          <CardTitle className="border-t border-white/5 p-4 text-base font-normal tracking-tighter">
                            {project.description}
                          </CardTitle>
                        </CardContent>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="py-2 text-center text-sm text-muted-foreground">
                <span className="font-semibold">
                  {current} / {count}
                </span>{" "}
                projects
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="mentors" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  List of 
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    Mentor
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  Here are some of the mentors who have inspired me. Feel free to reach out if you have any questions.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-md"
                >
                  <Image
                    src={service.image}
                    alt={service.service}
                    width={60}
                    height={60}
                    className="my-6 rounded-full object-cover aspect-square"
                  />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24"
          >
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Let&apos;s work{" "}
              <span className="text-gradient clash-grotesk">together.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              I&apos;m currently available for work and open to
              discussing new projects.
            </p>
            <Link href="mailto:gungwahari2@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>

        {/* Section BeMyDataset */}
        <section id="bemydataset" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24">
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Be My {" "}
              <span className="text-gradient clash-grotesk">Dataset.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Send your photo to help develop my Machine Learning model and my friends at B300 M-IoT.
            </p>

            <div className="mt-6 flex flex-col items-center">
              <video ref={videoRef} autoPlay playsInline className="hidden rounded-md border border-gray-200 shadow-md"></video>

              {/* start kamera */}
              <Button onClick={startCamera} className="mt-6">
                Start Camera
              </Button>

              {/* ambil foto mantap */}
              <Button onClick={capturePhoto} className="mt-6">
                Capture Photo
              </Button>

              {/* Tempat untuk menampilkan hasil foto */}
              <canvas ref={canvasRef} className="hidden mt-6"></canvas>

              {/* finis */}
              <Button onClick={uploadCapturedPhoto} className="mt-6">
                Upload Captured Photo
              </Button>
            </div>
          </div>
        </section>

        {/* Section TryMyModel */}
        <section id="trymymodel" data-scroll-section className="my-64">
          <div 
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-16 text-center xl:py-24">
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Try My {" "}
              <span className="text-gradient clash-grotesk">Agung-R1.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Powered by DeepSeek-R1, refined by Agung Hari. Try chatting with my local AI assistant. <br /> This model runs on my personal laptop (Intel Core i5 10th Gen, RTX 2060 Max-Q). <br />Average response time is around 45 seconds to 1 minute depending on your connection and the complexity of the question because Agung-R1 needs time to think. <br /> If the model doesnt respond in 2 minute, it probably means Agung laptop is off or Biznet wifi is acting up. Please try again later! you now officialy a beta tester for my model.
            </p>

            <div className="mt-6 w-full flex justify-center px-4">
              {/* Placeholder for future video or feature */}
              <div className="mt-6 w-full max-w-2xl text-left space-y-4">
                <div className="h-96 overflow-y-auto rounded-md border border-border bg-background p-4 text-sm shadow-inner">
                  {messages.map((msg, i) => (
                    <div key={i} className="mb-6">
                      <p className="font-semibold text-primary">You:</p>
                      <p className="mb-2 whitespace-pre-wrap">{msg.question}</p>

                      <p className="font-semibold text-secondary">Agung-R1:</p>

                      {/* 💭 Bagian THINK */}
                      {msg.think && (
                        <div className="mb-2 rounded-md border-l-4 border-yellow-400 bg-muted/40 p-3 text-sm italic text-muted-foreground">
                          💭 {msg.think}
                        </div>
                      )}

                      {/* ✅ Bagian JAWABAN */}
                      <p className="whitespace-pre-wrap text-muted-foreground">{msg.answer}</p>
                    </div>
                  ))}
                  {loading && <p className="text-muted-foreground italic">Agung-R1 is thinking...</p>}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Ask anything in English or Bahasa indonesia .... "
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full rounded-md border border-muted bg-background p-2 text-sm"
                  />
                  <Button onClick={handleSubmit} disabled={loading}>
                    Kirim
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
}


function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#upperGradient)"
            fillOpacity=".070"
            d="M317.219 518.975 L250 600 L50 460 L317.219 530 L600 310 C650 450 300 330 400 200 C900 100 920 50 1050 100 C1180 150 1100 300 950 320 L700 280 L720 600 L400 420 Z"

          />
          <defs>
            <linearGradient
              id="upperGradient"
              x1="800.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD700" /> 
              <stop offset={1} stopColor="#ADFF2F" /> 
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* middle gradient */}
      <div className="absolute top-40 right-80 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[45deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1200 600"
        >
          <path
            fill="url(#upperGradient)"
            fillOpacity=".05"
            d="M600,300 C850,50 950,200 1100,400 C1250,600 1050,550 850,450 C650,350 350,500 150,350 C-50,200 250,100 450,250 C550,325 600,300 600,300 Z"
          />
          <defs>
            <linearGradient
              id="upperGradient"
              x1="0"
              x2="1200"
              y1="0"
              y2="600"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD700" /> {/* Kuning di awal */}
              <stop offset={1} stopColor="#ADFF2F" /> {/* Hijau di akhir */}
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#lowerGradient)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="lowerGradient"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFD700" /> {/* Kuning */}
              <stop offset={1} stopColor="#ADFF2F" /> {/* Hijau Kekuningan */}
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
