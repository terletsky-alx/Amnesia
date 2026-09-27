import { ArrowRight, HardDrive, MonitorPlay, Scale, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Reveal } from "./reveal";

const METRICS = [
  { icon: HardDrive, value: "100%", label: "локально" },
  { icon: ShieldCheck, value: "0", label: "трекеров" },
  { icon: Scale, value: "GDPR", label: "compliant" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      {/* Декоративный фон: сетка + свечение */}
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(34,211,238,0.14),transparent_70%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent to-background"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/5 px-4 py-1.5 text-xs font-medium text-cyan-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            Privacy-first AI
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            AI, который умеет <span className="text-gradient">забывать</span>
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            Amnesia — приватный AI-ассистент, который фильтрует шум, анонимизирует ваши
            данные и архивирует неактуальное. Ваша информация остаётся только вашей.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href="#waitlist">
              Join waitlist
              <ArrowRight aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
            <a href="#demo">
              <MonitorPlay aria-hidden="true" />
              Смотреть демо
            </a>
          </Button>
        </Reveal>

        <Reveal delay={0.4} className="mt-16 w-full">
          <dl className="mx-auto grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
            {METRICS.map((metric) => (
              <div
                key={metric.label}
                className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5 text-left backdrop-blur-sm transition-colors hover:border-cyan-400/30"
              >
                <metric.icon className="h-6 w-6 shrink-0 text-cyan-400" aria-hidden="true" />
                <div>
                  <dt className="sr-only">{metric.label}</dt>
                  <dd className="text-xl font-semibold text-foreground">{metric.value}</dd>
                  <dd className="text-sm text-muted-foreground">{metric.label}</dd>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
