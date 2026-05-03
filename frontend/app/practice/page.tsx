"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const currentQuestion = {
  id: 1,
  korean: "지갑을 깜빡했어.",
  english: "I forgot my wallet.",
};

export default function PracticePage() {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" className="rounded-2xl">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />홈
            </Link>
          </Button>

          <div className="rounded-full bg-lime-300 px-4 py-2 text-xs font-semibold sm:text-sm">
            Speaking Practice
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <Card className="rounded-4xl border-none bg-white shadow-sm">
            <CardContent className="p-6 sm:p-8">
              <p className="mb-3 text-sm font-bold text-lime-500">한국어 뜻</p>

              <h1 className="text-3xl font-black leading-tight tracking-tight sm:text-5xl">
                {currentQuestion.korean}
              </h1>

              <p className="mt-4 text-sm leading-6 text-neutral-500 sm:text-base">
                아래 버튼을 눌러 한국어 문장을 듣고, 영어로 말해보세요.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button className="h-14 rounded-2xl bg-lime-400 font-bold text-black hover:bg-lime-300">
                  <Volume2 className="mr-2 size-5" />
                  한국어 듣기
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setShowAnswer(true)}
                  className="h-14 rounded-2xl border-neutral-300 bg-white font-bold"
                >
                  <Mic className="mr-2 size-5" />
                  정답 확인
                </Button>
              </div>
            </CardContent>
          </Card>

          {showAnswer && (
            <Card className="mt-5 rounded-4xl border-none bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-bold text-neutral-500">정답 영어</p>

                <div className="mt-4 rounded-3xl bg-neutral-100 p-5">
                  <p className="text-xl font-extrabold text-neutral-900 sm:text-2xl">
                    {currentQuestion.english}
                  </p>
                </div>

                <Button
                  onClick={() => setShowAnswer(false)}
                  className="mt-5 h-12 w-full rounded-2xl bg-neutral-900 font-bold text-white hover:bg-neutral-800"
                >
                  다음 문제
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </main>
  );
}
