import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const STEPS = [
  {
    number: "01",
    title: "Подключите данные",
    description:
      "Amnesia работает с вашими документами, заметками и диалогами — всё остаётся на вашем устройстве.",
  },
  {
    number: "02",
    title: "Amnesia фильтрует",
    description:
      "Шум удаляется, PII анонимизируется, а устаревшее автоматически уходит в локальный архив.",
  },
  {
    number: "03",
    title: "Вы управляете памятью",
    description:
      "Решайте, что помнить, что забыть и что архивировать. Полный контроль и прозрачный аудит.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28" aria-labelledby="how-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Как это работает"
          title="Три шага к приватности"
          description="Никаких серверов, никаких компромиссов. Только вы и ваш ассистент."
        />

        <div className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Соединительная линия на десктопе */}
          <div
            className="absolute left-0 right-0 top-8 hidden border-t border-dashed border-white/15 md:block"
            aria-hidden="true"
          />
          {STEPS.map((step, i) => (
            <Reveal key={step.number} delay={0.1 * i}>
              <div className="relative flex flex-col items-start gap-4">
                <span className="text-6xl font-bold tracking-tight text-white/10 sm:text-7xl">
                  {step.number}
                </span>
                <div className="relative rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
