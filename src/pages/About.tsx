import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import PortraitPlaceholder from "@/components/PortraitPlaceholder";
import Magnetic from "@/components/motion/Magnetic";
import photoLockerRoom from "@/assets/photos/locker-room.webp";
import photoPitchside from "@/assets/photos/leca-pitchside.webp";
import photoArrival from "@/assets/photos/leca-arrival.webp";
import photoTrophies from "@/assets/photos/anderlecht-trophies.webp";
import photoSign from "@/assets/photos/anderlecht-sign.webp";

/** Highlights an essential phrase with a soft on-brand marker, so the eye
 *  catches the spine of the story without reading every line. */
const Em = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      backgroundImage:
        "linear-gradient(hsl(var(--olive-light) / 0.22), hsl(var(--olive-light) / 0.22))",
      backgroundSize: "100% 0.4em",
      backgroundPosition: "0 90%",
      backgroundRepeat: "no-repeat",
      WebkitBoxDecorationBreak: "clone",
      boxDecorationBreak: "clone",
      fontWeight: 500,
      color: "hsl(var(--foreground))",
    }}
  >
    {children}
  </span>
);

const certifications = [
  "ISAK Level 1, Certified Anthropometrist",
  "Sports Nutrition & Supplementation, Challenges for Athletes in the Next Decade",
  "Nutrition in Football: From Men to Women",
  "Muscle Mass & Physical Function Assessment",
  "Nutrition in Wound Healing",
  "Youthpass Certificate, Erasmus+ Project, Italy",
];

const awards = [
  { title: "Sports Student Award", org: "FCNAUP", year: "2025" },
  { title: "Breakthrough of the Year", org: "AEFCNAUP", year: "2023/24" },
  { title: "Mentorship Program Student Award", org: "FCNAUP", year: "" },
  { title: "Academic Merit Awards", org: "Colégio Luso-Francês", year: "2014–2022" },
];

const About = () => {
  return (
    <Layout>
      <SEO title="About Guilherme Neves, Performance Nutrition & Systems" description="Performance nutrition learned inside elite football. Guilherme Neves on the work, the environments it came from, and why systems matter more than advice." path="/about" />
      {/* Who I am. The page opens on the person, not on a positioning line. */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid md:grid-cols-[1fr,340px] lg:grid-cols-[1fr,400px] gap-12 md:gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-caption mb-6">Who I am</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-display max-w-3xl">
                  Athlete by nature. Nutritionist by purpose.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg max-w-2xl mt-8">
                  I hold a BSc in Nutrition Sciences from FCNAUP, University of Porto,
                  and I am soon to be a registered nutritionist, with the professional
                  licence pending. I learned the job inside <Em>elite professional
                  football</Em> before I finished the degree: most recently at RSC
                  Anderlecht, and before that alongside the first team at Leça FC.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body max-w-2xl mt-4">
                  More than fifteen years as an athlete shape how I read a room and{" "}
                  <Em>earn the trust of athletes and staff</Em>. The aim is
                  international, and built to last.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-caption text-[10px] mt-8">
                  21 · Porto, Brussels
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="relative mt-4 md:mt-12">
                <PortraitPlaceholder caption="Guilherme Neves, Porto" />
              </div>
            </Reveal>
          </div>

          {/* Where it happened. Four frames instead of a paragraph of CV. */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 md:gap-4 mt-14 md:mt-20">
              {[
                { src: photoSign, alt: "Guilherme at the RSC Anderlecht training centre.", cap: "RSC Anderlecht", pos: "center 30%" },
                { src: photoTrophies, alt: "Guilherme inside the RSC Anderlecht club.", cap: "Brussels", pos: "center 20%" },
                { src: photoPitchside, alt: "Guilherme pitchside with Leça FC.", cap: "Leça FC", pos: "center 22%" },
                { src: photoArrival, alt: "Guilherme arriving with the Leça FC squad.", cap: "Matchday", pos: "center 25%" },
              ].map((ph) => (
                <figure key={ph.cap} className="relative overflow-hidden rounded-lg aspect-[3/4]">
                  <img src={ph.src} alt={ph.alt} className="w-full h-full object-cover" style={{ objectPosition: ph.pos }} loading="lazy" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.6), transparent 50%)" }} />
                  <figcaption className="absolute bottom-2.5 left-3 text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-display" style={{ color: "hsl(var(--ivory) / 0.85)" }}>
                    {ph.cap}
                  </figcaption>
                </figure>
              ))}
            </div>
          </Reveal>

          {/* Four photographs of him inside two clubs raise exactly one
              question, and until now the page made you scroll another four
              thousand pixels before offering any answer. The door goes where
              the curiosity is. */}
          <Reveal delay={0.25}>
            <Link
              to="/work"
              className="group inline-flex items-center gap-2.5 mt-6 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
            >
              What I actually did in those rooms
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Why this work */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Why this work</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-3xl">
              I have been an athlete my whole life.{" "}
              <span style={{ color: "hsl(var(--olive-light))", fontStyle: "italic", fontWeight: 300 }}>
                That is where this starts.
              </span>
            </h2>
          </Reveal>

          {/* Cinematic band, a real moment inside the football environment */}
          <Reveal delay={0.2}>
            <figure className="relative mt-10 md:mt-14 overflow-hidden rounded-lg">
              <img
                src={photoLockerRoom}
                alt="Guilherme focused inside a football dressing room before a match."
                className="w-full h-[38vh] md:h-[52vh] object-cover"
                style={{ objectPosition: "center 26%" }}
                loading="lazy"
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.55), transparent 55%)" }}
              />
              <figcaption
                className="absolute bottom-4 left-5 text-[10px] tracking-[0.28em] uppercase font-display"
                style={{ color: "hsl(var(--ivory) / 0.75)" }}
              >
                Inside the room, before it counts
              </figcaption>
            </figure>
          </Reveal>

          {/* Story, essentials marked so the spine reads at a glance */}
          <div className="grid md:grid-cols-[0.9fr,1.3fr] gap-8 md:gap-16 mt-12 md:mt-16">
            <Reveal delay={0.15}>
              <p
                className="font-display text-xl md:text-2xl font-light leading-snug"
                style={{ color: "hsl(var(--foreground))" }}
              >
                I lived it from the inside. And I learned that quality and effort, on their
                own, are <Em>never enough</Em>.
              </p>
            </Reveal>
            <div className="space-y-5 max-w-2xl">
              <Reveal delay={0.2}>
                <p className="text-body-lg">
                  Talent and work took me a long way, but they kept running into the same
                  wall. What was missing was <Em>strategy, and actually knowing what I was
                  doing with my body</Em>. The help I needed then did not exist around me, so
                  I decided to become it for the athletes coming up now.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body">
                  Things changed for me the day I built <Em>a calm relationship with food</Em>.
                  No pressure, nothing forbidden, enjoying it while being smart with my body.
                  That is what I want to hand to other athletes: take it seriously, drop the
                  taboos, and treat nutrition as quality you get to enjoy, not something to
                  fear. The <Em>healthiest food at the wrong moment does nothing for
                  performance</Em>, and almost nobody is told that.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Philosophy */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Philosophy</p>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-10 mt-8">
            {[
              {
                title: "Practical & Sustainable",
                text: "If it doesn't work in a real training week, it doesn't work. And it has to keep working, week after week, or it was never a system. What I build has to survive travel, fixtures and pressure, and still make sense a month later.",
              },
              {
                title: "Athlete-Centered",
                text: "I care about the person, not only the performance. Health comes with the results, never traded for them. Someone's tastes, culture and life have to fit inside the plan, because a strategy that ignores who they are will not survive.",
              },
              {
                title: "Evidence-Based",
                text: "Grounded in science, but always context dependent. Research points the direction; the athlete in front of me, their sport and the moment decide how it actually gets applied.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <motion.div
                  className="space-y-4 p-8 border border-transparent hover:border-border/60 hover:bg-card/50 transition-all duration-500"
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-caption text-xs">0{i + 1}</span>
                    <h3 className="font-display text-xl font-medium text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-body">{item.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Education & Credentials */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Education</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16 mt-8">
            <Reveal delay={0.1}>
              <div className="space-y-8">
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">BSc in Nutrition Sciences</h3>
                  <p className="text-body text-sm">FCNAUP, University of Porto</p>
                  <p className="text-caption text-[10px] font-normal">2022–2026 · BSc, graduated July 2026</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">Erasmus+ Mobility Project</h3>
                  <p className="text-body text-sm">Sicily, Italy</p>
                  <p className="text-caption text-[10px] font-normal">May 2024</p>
                </div>
                <div className="space-y-2">
                  <h3 className="font-display text-lg font-medium text-foreground">Sciences & Technology (12th)</h3>
                  <p className="text-body text-sm">Colégio Luso-Francês</p>
                </div>
              </div>
            </Reveal>
            <div>
              <Reveal delay={0.15}>
                <div className="mb-10">
                  <p className="text-caption text-xs mb-5">Awards</p>
                  <div className="space-y-4">
                    {awards.map((award) => (
                      <div key={award.title} className="flex items-baseline justify-between gap-4 py-2 border-b border-border/40">
                        <div>
                          <p className="font-display text-sm font-medium text-foreground">{award.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5">{award.org}</p>
                        </div>
                        {award.year && <span className="text-caption text-[10px] shrink-0">{award.year}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div>
                  <p className="text-caption text-xs mb-5">Certifications</p>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <p key={cert} className="text-body text-sm py-1.5 border-b border-border/30">{cert}</p>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* The close.
          This page used to end on "Considering an engagement?" and a single
          button to the contact form, which was also the only link in four and a
          half thousand pixels. It asked the wrong question. Someone who has
          just read who he is wants to know what he has actually done, not to
          write to a stranger, so the work goes first and the conversation goes
          second. About, then work, then contact, in that order. */}
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-2xl mx-auto">
              That's who I am. Here's what I've built.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-4">
              The systems, tools and frameworks that came out of those rooms,
              and what each one was actually for.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
              <Magnetic as="span" strength={7}>
                <Link
                  to="/work"
                  className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
                >
                  See the work
                </Link>
              </Magnetic>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 py-2 font-display text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors duration-300"
              >
                Or start a conversation
                <span aria-hidden>→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
