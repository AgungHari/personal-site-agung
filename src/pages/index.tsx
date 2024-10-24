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
      "ChatGPT, it seems I don’t need to explain at length. If you have money and had nothing to do with it, I will always recommend buying ChatGPT. Its ability to analyze code is undeniable! Even the website you are currently see was built with GPT.",
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
              alert('Cek koneksi atau hubungi agung via jerokedaton2@gmail.com');
            }
          })();
        }
      }, 'image/jpeg');
    }
  };
  
  
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
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
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
                    className="my-6 rounded-full"
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
            <Link href="mailto:jerokedaton2@gmail.com" passHref>
              <Button className="mt-6">Get in touch</Button>
            </Link>
          </div>
        </section>

        {/* Section BeMyDataset */}
        <section id="bemydataset" data-scroll-section className="my-64">
          <div className="flex flex-col items-center justify-center px-8 py-16 text-center xl:py-24">
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Be My {" "}
              <span className="text-gradient clash-grotesk">Dataset.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              Send your photo to help develop my Machine Learning model and my friends at B300 M-IoT.
            </p>

            <div className="mt-6 flex flex-col items-center">
              {/* Video yang hanya muncul setelah start camera */}
              <video ref={videoRef} autoPlay playsInline className="hidden rounded-md border border-gray-200 shadow-md"></video>

              {/* Tombol untuk memulai kamera */}
              <Button onClick={startCamera} className="mt-6">
                Start Camera
              </Button>

              {/* Tombol untuk menangkap gambar yang tetap tampil */}
              <Button onClick={capturePhoto} className="mt-6">
                Capture Photo
              </Button>

              {/* Tempat untuk menampilkan hasil foto */}
              <canvas ref={canvasRef} className="hidden mt-6"></canvas>

              {/* Tombol untuk mengunggah foto */}
              <Button onClick={uploadCapturedPhoto} className="mt-6">
                Upload Captured Photo
              </Button>
            </div>
          </div>
        </section>

        {/* Section TryMyModel */}
        <section id="trymymodel" data-scroll-section className="my-64">
          <div className="flex flex-col items-center justify-center px-8 py-16 text-center xl:py-24">
            <h2 className="text-4xl font-medium tracking-tighter xl:text-6xl">
              Try My {" "}
              <span className="text-gradient clash-grotesk">Model.</span>
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              This feature is still in development and will be available soon! You can see the progress of my model on GitHub.
            </p>

            <div className="mt-6 flex flex-col items-center">
              <Link href="https://github.com/AgungHari" passHref>
                <Button className="mt-6">
                  Visit My GitHub
                </Button>
              </Link>

              {/* Placeholder for future video or feature */}
              <div className="mt-6 w-full h-64 bg-gray-200 flex items-center justify-center rounded-md shadow-md">
                <p className="text-muted-foreground">Coming Soon...</p>
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
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
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
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
