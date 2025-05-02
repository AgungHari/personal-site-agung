import { ilmuMahalPosts } from "@/mantap/IlmuMahalPosts";
import { refleksiPosts } from "@/mantap/refleksi";
import { tutorialPosts } from "@/mantap/tutorial";
import { reviewPosts } from "@/mantap/review";
import Container from "@/components/Container";
import Gradient from "@/components/GradientBackground";
import { motion } from "framer-motion";
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Image from 'next/image';


const safeOneDark = oneDark as Record<string, unknown>;

type PostType = {
  slug: string;
  title: string;
  date: string;
  description: string;
  paragraphs: string[];
  images: string[];
  codes?: string[];
  languages?: string[];
  formulas?: string[];
};

type Props = {
  post: PostType | null;
  category: string;
};

export default function BlogDetail({ post, category }: Props) {
  
    if (!post) {
      return (
        <Container title="Post Not Found">
          <div className="py-24 text-center">
            <h1 className="text-3xl font-bold mb-4">404 - Post Not Found</h1>
            <p className="text-muted-foreground">Nyasar bang</p>
          </div>
        </Container>
      );
    }
  
    return (
        <Container title={post.title}>
            <Gradient />
                <section className="relative z-10 px-6 py-24 max-w-4xl mx-auto">
                    <motion.h1
                        className="text-4xl font-bold text-center mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                    {post.title}
                    </motion.h1>
                <section className="text-center text-muted-foreground mb-6">
                    <motion.h1
                        className="text-xs text-center mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                    {post.date}
                    </motion.h1>
                </section>

                
                {post.images.length > 0 && (
                <motion.div
                    className="relative w-full h-72 mb-12 overflow-hidden rounded-2xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Image src={post.images[0] ?? ""} alt="Gambar Utama" fill className="object-cover w-full h-full" />
                </motion.div>
                )}

                
                {category === "Refleksi" && (
                <div className="flex flex-col gap-8">
                    {post.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <motion.p
                            className="text-base leading-relaxed text-muted-foreground"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * index }}
                            dangerouslySetInnerHTML={{
                                __html:paragraph
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\*(.*?)\*/g, "<em>$1</em>") 
                                .replace(/^- (.*)$/gm, "<li>$1</li>")
                                .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>"),
                            }}
                        >
                            
                        </motion.p>

                    {post.images[index + 1] && (
                        <motion.div
                            className="relative w-full h-64 overflow-hidden rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Image
                                src={post.images[index + 1] ?? ""}
                                alt={`Gambar ${index + 2}`}
                                fill
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </motion.div>
                        )}
                    </div>
                    ))}
                </div>
                )}
                {/* review ni bos */}
                {category === "Review" && (
                <div className="flex flex-col gap-8">
                    {post.paragraphs.map((paragraph, index) => (
                    <div key={index} className="flex flex-col gap-4">
                        <motion.p
                            className="text-base leading-relaxed text-muted-foreground whitespace-pre-line"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.05 * index }}
                            dangerouslySetInnerHTML={{
                                __html:paragraph
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\*(.*?)\*/g, "<em>$1</em>") 
                                .replace(/^- (.*)$/gm, "<li>$1</li>")
                                .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>"),
                            }}
                        >
                        </motion.p>

                    {post.images[index + 1] && (
                        <motion.div
                            className="relative w-full h-64 overflow-hidden rounded-xl"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 * index }}
                        >
                            <Image
                                src={post.images[index + 1] ?? ""}
                                alt={`Gambar ${index + 2}`}
                                fill
                                className="object-cover w-full h-full rounded-xl"
                            />
                        </motion.div>
                        )}
                    </div>
                    ))}
                </div>
                )}

                
                {category === "Tutorial" && (
                <div className="flex flex-col gap-8">
                    {post.paragraphs.map((paragraph, index) => (
                        <div key={index} className="flex flex-col gap-4">
                            <motion.p
                                className="text-base leading-relaxed text-muted-foreground"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.05 * index }}
                                dangerouslySetInnerHTML={{
                                __html:paragraph
                                .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                                .replace(/\*(.*?)\*/g, "<em>$1</em>") 
                                .replace(/^- (.*)$/gm, "<li>$1</li>")
                                .replace(/(<li>.*<\/li>)/g, "<ul>$1</ul>"),
                                }}
                            >
                            </motion.p>

                            {post.images[index + 1] && (
                                <motion.div
                                    className="relative w-full h-64 overflow-hidden rounded-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.1 * index }}
                                >
                                    <Image
                                        src={post.images[index + 1] ?? ""}
                                        alt={`Gambar ${index + 2}`}
                                        fill
                                        className="object-cover w-full h-full rounded-xl"
                                    />
                                </motion.div>
                            )}
                            
                            {post.formulas?.[index] && (
                              <motion.div
                                className="relative w-full h-20 overflow-hidden rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 * index }}
                              >
                                <BlockMath math={post.formulas?.[index] ?? ""} />
                              </motion.div>
                            )}

                            {post.codes?.[index] && (
                              <div className="relative mt-4">
                                <div className="absolute top-2 left-2 bg-slate-700 text-slate-200 text-xs font-mono px-2 py-1 rounded-md">
                                  {post.languages?.[index] ?? "Code"}
                                </div>

                                
                                <button
                                  className="absolute top-2 right-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs font-mono px-2 py-1 rounded-md"
                                  onClick={() => navigator.clipboard.writeText(String(post.codes?.[index] ?? ""))}
                                >
                                  Copy
                                </button>

                                
                                <SyntaxHighlighter
                                  language={post.languages?.[index]?.toLowerCase() ?? "text"}
                                  style={safeOneDark}
                                  customStyle={{
                                    borderRadius: '8px',
                                    paddingTop: '2.5rem', 
                                    paddingBottom: '1rem',
                                    paddingLeft: '1rem',
                                    paddingRight: '1rem',
                                    fontSize: '0.85rem',
                                    background: '#1e293b',
                                  }}
                                >
                                  {post.codes?.[index] ?? ""}
                                </SyntaxHighlighter>
                              </div>
                            )}
                        </div>
                    ))}
                </div>)}
            </section>
        </Container>

    );
  }
  

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = ilmuMahalPosts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};


export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;

  const meta = ilmuMahalPosts.find((post) => post.slug === slug);

  if (!meta) {
    return {
      props: {
        post: null,
        category: null,
      },
    };
  }

  let content = null;

  if (meta.category === "Refleksi") {
    content = refleksiPosts.find((post) => post.slug === slug);
  } else if (meta.category === "Tutorial") {
    content = tutorialPosts.find((post) => post.slug === slug);
  } else if (meta.category === "Review") {
    content = reviewPosts.find((post) => post.slug === slug);
  } else {
    content = null; 
  }

  return {
    props: {
      post: content ?? null,
      category: meta.category,
    },
    revalidate: 60,
  };
};
