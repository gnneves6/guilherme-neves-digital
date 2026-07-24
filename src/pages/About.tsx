import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import PortraitPlaceholder from "@/components/PortraitPlaceholder";
import Magnetic from "@/components/motion/Magnetic";
import sceneTunnel from "@/assets/scene-invitation-exit.jpg";

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
      <SEO title="About, GN Performance Systems" description="The practice and the principal: diagnosis, translation and embedded nutrition systems by Guilherme Neves." path="/about" />
      {/* The Practice */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">The Practice</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-display max-w-4xl">
              A practice built where sport, science and systems meet.
            </h1>
          </Reveal>
          <Reveal delay={0.25}>
            <p className="text-body-lg max-w-2xl mt-8">
              GN Performance Systems is a performance nutrition practice for
              high-performance environments. The work is not about giving advice, it is about translating science into systems that survive a real
              training week, a competition block, a travel day.
            </p>
          </Reveal>
          <Reveal delay={0.35}>
            <p className="text-body max-w-2xl mt-4">
              Three disciplines hold the practice together: diagnosis of the
              environment as it actually operates, translation of evidence into
              decisions a staff can use, and embedded systems that keep nutrition
              consistent when intensity rises.
            </p>
          </Reveal>
          <Reveal delay={0.45}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border/40 mt-12 max-w-3xl">
              {[
                { k: "01", t: "Diagnosis", d: "Read the environment before prescribing." },
                { k: "02", t: "Translation", d: "Convert evidence into operable decisions." },
                { k: "03", t: "Systems", d: "Build structures that hold under pressure." },
              ].map((p) => (
                <div key={p.k} className="bg-background p-6">
                  <p className="text-caption text-[10px] mb-3">{p.k}</p>
                  <p className="font-display text-base font-medium text-foreground mb-2">{p.t}</p>
                  <p className="text-body text-sm">{p.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* The Principal */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid md:grid-cols-[1fr,340px] lg:grid-cols-[1fr,400px] gap-12 md:gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-caption mb-6">The Principal</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="text-headline max-w-3xl">
                  Guilherme Neves leads the practice.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="text-body-lg max-w-2xl mt-6">
                  A final-year Nutrition Sciences student at FCNAUP, University
                  of Porto, who recently completed a curricular internship in
                  Performance Nutrition at RSC Anderlecht.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-body max-w-2xl mt-4">
                  His perspective comes from inside sport. Years lived across
                  competitive disciplines shape how he reads environments,
                  designs interventions and earns the trust of athletes and staff.
                  The practice carries that perspective into every engagement.
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
                <PortraitPlaceholder caption="Guilherme Neves, Principal" />
              </div>
            </Reveal>
          </div>
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

          {/* Cinematic band, the athlete's path from the tunnel to the pitch */}
          <Reveal delay={0.2}>
            <figure className="relative mt-10 md:mt-14 overflow-hidden rounded-lg">
              <img
                src={sceneTunnel}
                alt="A stadium tunnel opening onto the pitch, the passage from athlete to practitioner."
                className="w-full h-[38vh] md:h-[52vh] object-cover"
                style={{ objectPosition: "center 40%" }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to top, hsl(var(--charcoal-deep) / 0.5), transparent 55%)" }}
              />
              <figcaption
                className="absolute bottom-4 left-5 text-[10px] tracking-[0.28em] uppercase font-display"
                style={{ color: "hsl(var(--ivory) / 0.72)" }}
              >
                From the pitch to the practice
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
                  So much of what athletes struggle with is shared. Eating too much, or the
                  wrong things, or trusting that healthy always means right, when the{" "}
                  <Em>healthiest food at the wrong moment does nothing for performance</Em>. I
                  went into nutrition sciences to understand something this present in our
                  lives that most people never stop to see. Food shapes how we show up, how
                  we recover, and quietly, how healthy we stay. It is not a diet and it is
                  not the enemy. It is a tool, and <Em>it can be a friendly one</Em>.
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <p className="text-body">
                  Things changed for me the day I built <Em>a calm relationship with food</Em>.
                  No pressure, nothing forbidden, enjoying it while being smart with my body.
                  That is what I want to hand to other athletes, and to as many people as I
                  can: to take this seriously, drop the taboos, and treat nutrition as quality
                  we get to enjoy, not something to fear. I want to be <Em>genuinely
                  useful</Em>, give real value, and build this the right way.
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

      {/* The Intersection */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">The Intersection</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-3xl">
              Sport. Discipline. Education. Application.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-2xl mt-6">
              My work sits where these worlds converge. I don't believe in
              nutrition advice that exists in isolation. Real impact happens when
              knowledge is embedded into systems, when education becomes a team
              habit, and when discipline is designed into the structure, not left
              to willpower.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {["Sport Performance", "Applied Education", "Lifestyle Discipline", "System Design"].map((item, i) => (
                <div key={item} className="py-4 border-t border-border">
                  <p className="text-caption text-[10px] mb-2">0{i + 1}</p>
                  <p className="font-display text-sm font-medium text-foreground">{item}</p>
                </div>
              ))}
            </div>
          </Reveal>
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
                  <p className="text-caption text-[10px] font-normal">2022–2026 · Final-year student</p>
                  <p className="text-body text-sm mt-2">Curricular internship at RSC Anderlecht: Feb–Jun 2026</p>
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

      {/* Looking Outward */}
      <section className="section-padding section-spacing">
        <div className="max-content grid md:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <p className="text-caption mb-6">Looking Outward</p>
              <h2 className="text-headline max-w-3xl">
                International ambition. Meaningful work. Long-term vision.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-body-lg">
                I'm building toward a career defined by contribution to elite sport
                environments internationally. The ambition is clear: create
                genuinely useful systems, work with high-performance organisations,
                and continuously raise the standard of what practical sport
                nutrition looks like.
              </p>
              <p className="text-body-lg">
                Not for visibility. For impact. For building things that last and
                environments that perform better because of how they think about
                nutrition.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* CTA */}
      <section className="section-padding section-spacing">
        <div className="max-content text-center">
          <Reveal>
            <h2 className="text-headline max-w-2xl mx-auto">
              Considering an engagement?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-4">
              The practice opens a limited number of conversations each season
              with organisations and staff serious about performance nutrition.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Magnetic as="span" strength={7} className="mt-8">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
              >
                Enquire about an engagement
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
