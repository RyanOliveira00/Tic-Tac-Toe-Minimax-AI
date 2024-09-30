import { Board } from "@/components/board";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

export default function HomePage() {
  const words = [
    {
      text: "Tente",
    },
    {
      text: "vencer",
    },
    {
      text: "a",
    },
    {
      text: "inteligência",
    },
    {
      text: "artificial",
      className: "text-[hsl(280,100%,70%)]",
    },
    {
      text: "no",
    },
    {
      text: "jogo",
    },
    {
      text: "da",
    },
    {
      text: "velha.",
    },
  ];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <TextGenerateEffect words="Jogo da velha IA"  className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"/>
        </h1>

        <TypewriterEffect words={words} className="text-base" />

        <Board />
      </div>
    </main>
  );
}
