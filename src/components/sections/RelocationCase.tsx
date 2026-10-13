import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import Chapter from "@/components/motion/Chapter";

/**
 * One case, and the method is all of it.
 *
 * The site had seventeen artefacts and no case. A club director who has just
 * been sent a cold message does not want a catalogue, they want to know
 * whether this has ever actually been done. One week, described step by step,
 * answers that; a list of titles does not.
 *
 * Everything identifying is missing on purpose, and the absence is the
 * strongest thing here rather than a limitation of it. In that room the scarce
 * commodity is not technical knowledge, it is somebody who comes in and does
 * not talk about it afterwards. Every other person making content in this
 * field optimises for exposure, which is precisely what disqualifies them from
 * the room. So this page declines the photograph it could have asked for, and
 * says why, because saying why is the part a reader can check against how I
 * behave.
 *
 * No country either. The forbidden list it was written against covers the
 * name, the club, the crest, the photograph and the data; the geography is not
 * on that list and adds nothing a buyer needs, while a country plus a month is
 * enough for anyone inside the game to work the rest out. Taken out for the
 * same reason the rest is out.
 */
const week = [
  {
    num: "01",
    title: "Anamnesis in person, across days",
    body: "Asked on the first day, everything was fine. Asked again days later, once there was somebody in the room he actually knew, it was not. The answers did not change because the questions improved. They changed because the distance closed.",
  },
  {
    num: "02",
    title: "Full ISAK anthropometric assessment",
    body: "Eight skinfolds, girths and breadths, measured by an accredited anthropometrist, with the measurement error written beside the numbers so that a few millimetres of noise is never reported back as progress.",
  },
  {
    num: "03",
    title: "Mapped what he can actually buy",
    body: "Shop by shop, where he now lives, with the local names of the things worth putting in the basket written down in the local language, so the next trip does not depend on me being there.",
  },
  {
    num: "04",
    title: "Built the bridge to the food of home",
    body: "He had not only changed club. The food he grew up eating is not on those shelves under any name. Every dish he knows was matched to what the shops there do hold, so the change landed in the shopping and not in what he eats.",
  },
  {
    num: "05",
    title: "Cooked it with him",
    body: "In his kitchen, with the pans he owns. A plan the kitchen cannot execute is worth nothing, and the only way to know whether it can is to stand in it.",
  },
  {
    num: "06",
    title: "Left the system behind",
    body: "What to buy, what to ask for, what the day of a match looks like hour by hour, and who to ask when it breaks. The week ends. The system is what does not.",
  },
];

const RelocationCase = () => (
  <section className="section-padding section-spacing-sm relative">
    <div className="max-content">
      <Reveal>
        <Chapter
          number="03"
          title="One case."
          tone="light"
          className="mb-10 md:mb-14"
          meta={
            <p className="text-[10px] tracking-[0.3em] uppercase font-display opacity-40">
              Relocation week, on site
            </p>
          }
        />
      </Reveal>

      <Reveal>
        <h2 className="text-headline max-w-3xl">
          A player changes country. Nothing he ate changes with him.
        </h2>
      </Reveal>

      <Reveal delay={0.1}>
        <p className="text-body-lg max-w-2xl mt-6">
          New club, new city, new kitchen, shelves in a language he does not
          read, and nobody
          around him who knows what he eats. That is what I was brought in for.
          It ran in his home and in his shops, over days, and not one part of it
          would have worked as a phone call.
        </p>
      </Reveal>

      <div className="mt-12 md:mt-16 border-t border-border/60">
        {week.map((step, i) => (
          <Reveal key={step.num} delay={0.12 + i * 0.06}>
            <div className="grid md:grid-cols-[72px,1fr] gap-3 md:gap-10 items-baseline py-7 md:py-8 border-b border-border/60">
              <span
                className="font-display text-[10px] tracking-[0.3em]"
                style={{ color: "hsl(var(--olive))" }}
              >
                {step.num}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-xl md:text-2xl font-medium tracking-tight text-foreground">
                  {step.title}
                </h3>
                <p className="text-body text-sm md:text-base mt-2.5 max-w-2xl leading-relaxed">
                  {step.body}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.2}>
        <motion.p
          className="mt-12 md:mt-14 font-display text-xl md:text-2xl font-light leading-snug max-w-2xl text-foreground"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          Not one line of that list can be done from a distance. That is not a
          detail of this case. It is the argument.
        </motion.p>
      </Reveal>

      <Reveal delay={0.28}>
        <p className="text-body text-sm mt-8 max-w-2xl leading-relaxed">
          No name, no club, no crest, no photograph, no numbers. The people who
          let you in are the people you do not talk about afterwards, and the
          list above is the whole of what the week contains.
        </p>
      </Reveal>
    </div>
  </section>
);

export default RelocationCase;
