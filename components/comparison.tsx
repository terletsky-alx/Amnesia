import { CheckCircle2, XCircle } from "lucide-react";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const REGULAR_AI = [
  "Собирает и хранит ваши данные на серверах",
  "PII попадает в модель и логи",
  "Чёрный ящик: непонятно, что именно помнит",
  "Данные могут уйти рекламодателям",
];

const AMNESIA = [
  "Данные остаются у вас — 100% локально",
  "PII удаляется до обработки моделью",
  "Прозрачный аудит каждой сессии",
  "Ничего не хранит без необходимости",
];

export function Comparison() {
  return (
    <section className="relative py-20 sm:py-28" aria-labelledby="comparison-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Сравнение"
          title="Обычные AI vs Amnesia"
          description="Большинство AI-ассистентов учатся на ваших данных. Amnesia устроен наоборот."
        />

        <div className="grid gap-6 md:grid-cols-2">
          <Reveal delay={0.1}>
            <div className="h-full rounded-2xl border border-white/10 bg-white/[0.02] p-8">
              <h3 className="text-lg font-semibold text-foreground">Обычные AI</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {REGULAR_AI.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-400/80" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="relative h-full rounded-2xl border border-cyan-400/40 bg-cyan-400/[0.04] p-8 shadow-[0_0_60px_-15px_rgba(34,211,238,0.25)]">
              <span className="absolute -top-3 right-6 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-[#0a0e1a]">
                Amnesia
              </span>
              <h3 className="text-lg font-semibold text-foreground">Amnesia</h3>
              <ul className="mt-6 flex flex-col gap-4">
                {AMNESIA.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-400" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
