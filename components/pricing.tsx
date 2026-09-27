import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "навсегда",
    description: "Для знакомства с Amnesia",
    features: [
      "100 запросов в месяц",
      "Базовая анонимизация PII",
      "Локальное хранение",
      "1 устройство",
    ],
    cta: "Начать бесплатно",
    popular: false,
  },
  {
    name: "Plus",
    price: "$9",
    period: "в месяц",
    description: "Для тех, кто ценит приватность",
    features: [
      "Безлимитные запросы",
      "Умная архивация",
      "Прозрачный аудит",
      "3 устройства",
      "Приоритетная поддержка",
    ],
    cta: "Join waitlist",
    popular: true,
  },
  {
    name: "Team",
    price: "$29",
    period: "в месяц",
    description: "Для команд и компаний",
    features: [
      "Всё из Plus",
      "До 5 пользователей",
      "Единый аудит-журнал",
      "SSO и роли",
      "SLA 99,9%",
    ],
    cta: "Связаться с нами",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-20 py-20 sm:py-28" aria-labelledby="pricing-heading">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Простые тарифы"
          description="Начните бесплатно. Платите только за то, что используете."
        />

        <div className="grid items-stretch gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={0.08 * i} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-8 transition-all duration-300 hover:-translate-y-1",
                  plan.popular
                    ? "border-cyan-400/50 bg-cyan-400/[0.05] shadow-[0_0_60px_-15px_rgba(34,211,238,0.3)]"
                    : "border-white/10 bg-white/[0.02] hover:border-white/20",
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-[#0a0e1a]">
                    Популярный
                  </span>
                )}

                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{plan.description}</p>

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-sm text-muted-foreground">/ {plan.period}</span>
                </div>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.popular ? "text-cyan-400" : "text-muted-foreground/60",
                        )}
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.popular ? "default" : "outline"}
                  className="mt-8 w-full"
                >
                  <a href="#waitlist">{plan.cta}</a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
