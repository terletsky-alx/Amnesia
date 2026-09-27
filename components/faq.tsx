"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

const FAQ_ITEMS = [
  {
    question: "Что значит «AI, который умеет забывать»?",
    answer:
      "Amnesia автоматически определяет, какая информация устарела или потеряла актуальность, и архивирует её локально. Вы можете в любой момент восстановить или удалить архив — как и человеческая память, только под вашим контролем.",
  },
  {
    question: "Где хранятся мои данные?",
    answer:
      "Только на вашем устройстве. Amnesia работает локально и не отправляет диалоги, документы или метаданные на сервер. Никаких облачных копий без вашего явного согласия.",
  },
  {
    question: "Как работает анонимизация PII?",
    answer:
      "Перед обработкой запроса моделью Amnesia находит персональные данные — имена, телефоны, адреса, даты, email — и заменяет их на токены ([ИМЯ], [ТЕЛЕФОН] и т.д.). Обратная подстановка возможна только локально и только с вашего разрешения.",
  },
  {
    question: "Что такое умная архивация?",
    answer:
      "Amnesia анализирует, как часто вы обращаетесь к той или иной информации. То, что долго не использовалось, автоматически перемещается в локальный архив, освобождая контекст и ускоряя работу ассистента.",
  },
  {
    question: "Amnesia соответствует GDPR?",
    answer:
      "Да. Локальная обработка, право на удаление, прозрачный аудит и отсутствие передачи данных третьим лицам — Amnesia спроектирован в полном соответствии с GDPR и 152-ФЗ.",
  },
  {
    question: "Чем Amnesia отличается от других AI-ассистентов?",
    answer:
      "Большинство ассистентов хранят всё, что вы им отправляете, и используют это для обучения. Amnesia по умолчанию ничего не хранит: шум фильтруется, PII анонимизируется, неактуальное архивируется. Приватность — не опция, а фундамент.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 sm:py-28" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Частые вопросы"
          description="Не нашли ответ? Напишите нам — отвечаем быстро."
        />

        <Reveal>
          <div className="flex flex-col">
            {FAQ_ITEMS.map((item, i) => {
              const open = openIndex === i;
              return (
                <div key={item.question} className="border-b border-white/10">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      onClick={() => setOpenIndex(open ? null : i)}
                      className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium text-foreground transition-colors hover:text-cyan-300 sm:text-base"
                    >
                      {item.question}
                      <ChevronDown
                        className={cn(
                          "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                          open && "rotate-180 text-cyan-400",
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
