"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Reveal } from "./reveal";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Введите корректный email");
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  return (
    <section id="waitlist" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="waitlist-heading">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-b from-cyan-400/[0.07] to-transparent px-6 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_50%_60%_at_50%_0%,rgba(34,211,238,0.18),transparent_70%)]"
              aria-hidden="true"
            />

            <div className="relative">
              <h2
                id="waitlist-heading"
                className="text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
              >
                Присоединяйтесь к waitlist
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-pretty text-base text-muted-foreground">
                Первыми получите доступ к Amnesia. Никакого спама — только запуск и новости
                о приватности.
              </p>

              {submitted ? (
                <div
                  className="mx-auto mt-10 flex max-w-md items-center justify-center gap-3 rounded-xl border border-cyan-400/30 bg-cyan-400/10 px-6 py-4"
                  aria-live="polite"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                  <p className="text-sm text-foreground">
                    Вы в списке! Мы напишем вам первым.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
                  noValidate
                >
                  <div className="flex-1">
                    <Label htmlFor="waitlist-email" className="sr-only">
                      Ваш email
                    </Label>
                    <Input
                      id="waitlist-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError(null);
                      }}
                      aria-invalid={error ? true : undefined}
                      aria-describedby={error ? "waitlist-email-error" : undefined}
                      className="h-11 border-white/10 bg-[#0a0e1a]/60 text-foreground placeholder:text-muted-foreground/60 focus-visible:ring-cyan-400/50"
                    />
                  </div>
                  <Button type="submit" size="lg" className="h-11">
                    Join waitlist
                    <ArrowRight aria-hidden="true" />
                  </Button>
                </form>
              )}

              {error && (
                <p id="waitlist-email-error" role="alert" className="mt-3 text-sm text-red-400">
                  {error}
                </p>
              )}

              <p className="mt-6 text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь получать письма о запуске. Отписка — в один клик.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
