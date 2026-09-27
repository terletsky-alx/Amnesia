"use client";

import { useState, type FormEvent } from "react";
import { Loader2, ScanText, ShieldCheck, Sparkles } from "lucide-react";
import { anonymize, countByType, type AnonymizeResult } from "@/lib/anonymizer";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const SAMPLE_INPUT = `Меня зовут Анна Сидорова, я из Москвы.
Мой телефон +7 (912) 345-67-89, почта anna.sidorova@example.com.
Договорились встретиться 15.10.2026 в Санкт-Петербурге.`;

/** Подсветка токенов вида [ИМЯ] в результате. */
function HighlightedText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\])/g);
  return (
    <>
      {parts.map((part, i) =>
        /^\[[^\]]+\]$/.test(part) ? (
          <mark
            key={i}
            className="rounded bg-cyan-400/15 px-1 py-0.5 font-medium text-cyan-300 ring-1 ring-inset ring-cyan-400/30"
          >
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

export function Demo() {
  const [input, setInput] = useState(SAMPLE_INPUT);
  const [result, setResult] = useState<AnonymizeResult | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || processing) return;
    setProcessing(true);
    // Небольшая задержка для ощущения «обработки»
    window.setTimeout(() => {
      setResult(anonymize(input));
      setProcessing(false);
    }, 600);
  };

  const counts = result ? countByType(result.replacements) : {};

  return (
    <section id="demo" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="demo-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Демо"
          title="Попробуйте анонимизацию"
          description="Вставьте текст с персональными данными — Amnesia заменит их на токены. Прямо в браузере, без отправки на сервер."
        />

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 lg:grid-cols-2"
          >
            {/* Ввод */}
            <div className="flex flex-col gap-3">
              <Label htmlFor="demo-input" className="text-sm font-medium text-foreground">
                Ввод
              </Label>
              <Textarea
                id="demo-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Вставьте текст с именами, телефонами, городами, датами…"
                className="min-h-[240px] flex-1 resize-y border-white/10 bg-[#0a0e1a]/60 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-cyan-400/50"
              />
              <Button
                type="submit"
                disabled={processing || !input.trim()}
                className="w-full sm:w-auto"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" aria-hidden="true" />
                    Обработка…
                  </>
                ) : (
                  <>
                    <Sparkles aria-hidden="true" />
                    Анонимизировать
                  </>
                )}
              </Button>
            </div>

            {/* Результат */}
            <div className="flex flex-col gap-3">
              <Label className="text-sm font-medium text-foreground">Результат</Label>
              <div
                className="min-h-[240px] flex-1 rounded-md border border-white/10 bg-[#0a0e1a]/60 p-4 text-sm leading-relaxed"
                aria-live="polite"
              >
                {result ? (
                  <p className="whitespace-pre-wrap text-foreground">
                    <HighlightedText text={result.text} />
                  </p>
                ) : (
                  <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-3 text-center text-muted-foreground">
                    <ScanText className="h-8 w-8 text-muted-foreground/50" aria-hidden="true" />
                    <p className="max-w-[240px] text-sm">
                      Нажмите «Анонимизировать», чтобы увидеть результат
                    </p>
                  </div>
                )}
              </div>

              {result && (
                <div className="flex flex-wrap items-center gap-2" aria-label="Найденные замены">
                  <ShieldCheck className="h-4 w-4 text-cyan-400" aria-hidden="true" />
                  {Object.keys(counts).length > 0 ? (
                    Object.entries(counts).map(([type, count]) => (
                      <span
                        key={type}
                        className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-0.5 text-xs font-medium text-cyan-300"
                      >
                        [{type}] × {count}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      PII не найдены — текст чист
                    </span>
                  )}
                </div>
              )}
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
