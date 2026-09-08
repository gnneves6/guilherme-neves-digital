import Reveal from "@/components/Reveal";
import { publishableEndorsements, reception } from "@/data/endorsements";

/**
 * Reception: what happened when the tools were given away.
 *
 * The site could say the work is useful. This is the section where other
 * people say it instead, which is the only version a stranger has reason to
 * believe.
 *
 * It is deliberately in two halves, because the two halves are true in
 * different ways and must not be blurred together:
 *
 * - The numbers are his own data about his own posts, so they need nobody's
 *   permission and can go up today.
 * - The quotes are other people's words, so they go up one at a time, as each
 *   person says yes. `publishableEndorsements` filters the rest out, and until
 *   the first yes arrives this half renders nothing at all rather than
 *   rendering a placeholder. An empty proof section is honest; a fake one is
 *   the thing this site exists to avoid.
 *
 * Placed immediately before the ladder on the home, so the reader meets the
 * evidence just before the page first asks them to do something.
 */
export default function Reception() {
  const quotes = publishableEndorsements();

  return (
    <section
      className="py-24 md:py-32 px-6 md:px-10"
      aria-labelledby="reception-heading"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal>
          <h2
            id="reception-heading"
            className="font-display text-[11px] tracking-[0.3em] uppercase opacity-55 mb-12"
          >
            What came back
          </h2>
        </Reveal>

        <Reveal>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">
            {reception.items.map((item) => (
              <div key={item.label}>
                <dt className="font-display text-4xl md:text-5xl font-medium tracking-tight">
                  {item.figure}
                </dt>
                <dd className="text-sm leading-relaxed opacity-65 mt-3 max-w-[28ch]">
                  {item.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        {quotes.length > 0 && (
          <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-12">
            {quotes.map((e) => (
              <Reveal key={e.id}>
                <figure>
                  <blockquote className="font-display text-xl md:text-2xl leading-snug">
                    {e.quote}
                  </blockquote>
                  <figcaption className="mt-5 text-[11px] tracking-[0.2em] uppercase opacity-55">
                    {e.name}
                    <span className="block mt-1 tracking-normal normal-case opacity-80">
                      {e.role}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
