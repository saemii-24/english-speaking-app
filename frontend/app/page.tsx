import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  const steps = [
    ["01", "문장 업로드", "영어와 한국어 뜻을 함께 저장"],
    ["02", "한국어 듣기", "TTS로 문제를 자동 재생"],
    ["03", "영어 말하기", "녹음 후 정답과 비교"],
  ];

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center justify-center px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-6 rounded-full bg-lime-300 px-4 py-2 text-xs font-semibold sm:text-sm">
          AI Speaking Trainer
        </div>

        <h1 className="text-center text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
          한국어를 듣고,
          <br />
          영어로 바로 말해보자
        </h1>

        <p className="mt-5 max-w-xl text-center text-sm text-neutral-600 sm:text-base">
          영어 문장과 한국어 뜻을 업로드하면, 앱이 한국어를 읽어주고 사용자는
          영어로 답하는 말하기 훈련 앱입니다.
        </p>

        {/* 버튼 */}
        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button
            asChild
            className="h-12 w-full rounded-2xl bg-lime-400 px-7 font-bold text-black hover:bg-lime-300 sm:w-auto"
          >
            <Link href="/practice">연습 시작</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="h-12 w-full rounded-2xl sm:w-auto"
          >
            <Link href="/sentences">문장 등록</Link>
          </Button>
        </div>

        {/* 카드 */}
        <div className="mt-10 grid w-full grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map(([num, title, desc]) => (
            <Card
              key={num}
              className="rounded-3xl border-none bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-5 sm:p-6">
                <div className="mb-4 text-3xl font-black text-lime-400 sm:text-4xl">
                  {num}
                </div>
                <h2 className="font-bold">{title}</h2>
                <p className="mt-2 text-sm text-neutral-500">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
