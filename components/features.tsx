import { Archive, Brain, FileSearch, ShieldCheck } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const FEATURES = [
  {
    icon: Brain,
    title: "Контекстный AI",
    description:
      "Понимает контекст ваших задач и помнит только то, что действительно важно. Шум и лишнее отсекаются автоматически.",
  },
  {
    icon: ShieldCheck,
    title: "Анонимизация PII",
    description:
      "Имена, телефоны, адреса и даты заменяются на токены до того, как данные дойдут до модели. Обратно — только с вашего разрешения.",
  },
  {
    icon: Archive,
    title: "Умная архивация",
    description:
      "Неактуальные диалоги и документы архивируются локально. Amnesia забывает вовремя — как и человек.",
  },
  {
    icon: FileSearch,
    title: "Прозрачный аудит",
    description:
      "Полный журнал того, что ассистент запомнил, забыл и заархивировал. Каждое действие можно отменить.",
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="features-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Features"
          title="Всё для приватности"
          description="Четыре механизма, которые делают Amnesia по-настоящему приватным ассистентом."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {FEATURES.map((feature, i) => (
            <Reveal key={feature.title} delay={0.08 * i}>
              <article className="group h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-cyan-400/[0.03] hover:shadow-[0_8px_40px_-12px_rgba(34,211,238,0.2)]">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 ring-1 ring-inset ring-cyan-400/25 transition-colors group-hover:bg-cyan-400/15">
                  <feature.icon className="h-5 w-5 text-cyan-400" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
