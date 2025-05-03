import Container from "@/components/Container";
import Gradient from "@/components/GradientBackground";
import { ilmuMahalPosts } from "@/mantap/IlmuMahalPosts";
import Link from "next/link";
import { motion } from "framer-motion";
import type { GetStaticProps } from "next";
import Image from "next/image"; 
import { useState } from 'react';
import { Search } from "lucide-react";

type Props = {
  posts: typeof ilmuMahalPosts;
};

export default function IlmuMahalPage({ posts }: Props) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchQuery(event.currentTarget.value);
    }
  } 

  return (
    <Container title="Blog">
      <Gradient />
      <section className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <motion.h1
          className="text-3xl font-bold animate-gradient-slide bg-gradient-to-r from-primary to-secondary bg-clip-text transition-colors duration-3000 text-center mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Blog
        </motion.h1>

        <motion.p
          className="text-muted-foreground text-center max-w-2xl mx-auto text-base mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A personal repository of thoughts and life lessons, written to document the mental checkpoints of my growth. Each entry marks a version of who I was and who I&apos;m becoming.
        </motion.p>

        <div className="flex items-center gap-4 mb-5 mx-auto max-w-md">
        <motion.input
            type="text"
            placeholder="Search posts..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background text-foreground placeholder-muted shadow-sm hover:shadow-md transition-shadow duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        />

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
          {filteredPosts.map((post, index: number) => (
            <Link href={`/ilmu-mahal/${post.slug}`} key={post.slug} passHref>
              <motion.article
                className="relative overflow-hidden h-full min-h-[250px] flex flex-col justify-between group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md text-card-foreground shadow-xl p-6 transition-all hover:scale-[1.015] hover:shadow-lg hover:border-white/20 hover:bg-white/10 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1, delay: index * 0.01 }}
                viewport={{ once: true, amount: 0.2 }}
              >
                {/* Background Image */}
                {post.image && (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="absolute inset-0 object-cover opacity-30 blur-[3px] z-0"
                  />
                )}

                {/* Konten di atas background */}
                <div className="relative z-10 flex-grow">
                  <p className="text-xs font-semibold uppercase text-gray-400">{post.category}</p>
                  <h2 className="text-2xl font-bold text-muted-foreground group-hover:animate-gradient-slide group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary group-hover:bg-clip-text transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
                <time className="relative z-10 text-xs text-gray-500 mt-4">{post.date}</time>
              </motion.article>
            </Link>
          ))}
        </div>
      </section>
    </Container>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      posts: ilmuMahalPosts,
    },
    revalidate: 60, 
  };
};
