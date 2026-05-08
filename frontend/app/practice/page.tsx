"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mic, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const currentQuestion = {
  id: 1,
  korean: "지갑을 깜빡했어.",
  english: "I forgot my wallet.",
};

export default function PracticePage() {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const speakKorean = async () => {
    try {
      setIsSpeaking(true);

      const response = await fetch(
        `http://localhost:8000/api/tts?text=${encodeURIComponent(
          currentQuestion.korean
        )}`
      );

      if (!response.ok) throw new Error("TTS 요청 실패");

      const data = await response.json();
      const audio = new Audio(`http://localhost:8000${data.audio_url}`);

      audio.play();
      audio.onended = () => setIsSpeaking(false);
    } catch (error) {
      console.error(error);
      setIsSpeaking(false);
    }
  };

  const startRecording = async () => {
    try {
      setShowAnswer(false);
      setRecordedAudioUrl(null);

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunksRef.current, {
          type: "audio/webm",
        });

        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(audioUrl);

        stream.getTracks().forEach((track) => track.stop());

        // 나중에 여기서 audioBlob을 backend /api/stt로 보낼 예정
        console.log("녹음 파일:", audioBlob);

        setShowAnswer(true);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error(error);
      alert("마이크 권한을 허용해야 녹음할 수 있어요.");
    }
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setIsRecording(false);
  };

  return (
    <main className="min-h-screen bg-neutral-100 text-neutral-900">
      <section className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <Button asChild variant="ghost" className="rounded-2xl">
            <Link href="/">
              <ArrowLeft className="mr-2 size-4" />
              홈
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
                한국어 문장을 듣고, 영어로 직접 말해보세요.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  onClick={speakKorean}
                  disabled={isSpeaking || isRecording}
                  className="h-14 rounded-2xl bg-lime-400 font-bold text-black hover:bg-lime-300"
                >
                  <Volume2 className="mr-2 size-5" />
                  {isSpeaking ? "재생 중..." : "한국어 듣기"}
                </Button>

                {!isRecording ? (
                  <Button
                    variant="outline"
                    onClick={startRecording}
                    className="h-14 rounded-2xl border-neutral-300 bg-white font-bold"
                  >
                    <Mic className="mr-2 size-5" />
                    녹음 시작
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    className="h-14 rounded-2xl bg-neutral-900 font-bold text-white hover:bg-neutral-800"
                  >
                    <Square className="mr-2 size-5" />
                    녹음 완료
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {recordedAudioUrl && (
            <Card className="mt-5 rounded-4xl border-none bg-white shadow-sm">
              <CardContent className="p-6 sm:p-8">
                <p className="text-sm font-bold text-neutral-500">
                  내 녹음 다시 듣기
                </p>

                <audio controls src={recordedAudioUrl} className="mt-4 w-full" />
              </CardContent>
            </Card>
          )}

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
                  onClick={() => {
                    setShowAnswer(false);
                    setRecordedAudioUrl(null);
                  }}
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