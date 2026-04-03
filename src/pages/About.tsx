import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import portraitImg from "@/assets/guilherme-portrait.jpg";

const certifications = [
  "ISAK Level 1 — Certified Anthropometrist",
  "Sports Nutrition & Supplementation — Challenges for Athletes in the Next Decade",
  "Nutrition in Football: From Men to Women",
  "Muscle Mass & Physical Function Assessment",
  "Nutrition in Wound Healing",
  "Youthpass Certificate — Erasmus+ Project, Italy",
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
      {/* Hero */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <div className="grid md:grid-cols-[1fr,340px] lg:grid-cols-[1fr,400px] gap-12 md:gap-16 items-start">
            <div>
              <Reveal>
                <p className="text-caption mb-6">About</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="text-display max-w-4xl">
                  Athlete by nature. Nutritionist by purpose.
                </h1>
              </Reveal>
              <Reveal delay={0.25}>
                <p className="text-body-lg max-w-2xl mt-8">
                  I am a 21-year-old final-year Nutrition Sciences student at FCNAUP
                  (University of Porto), currently completing my curricular internship
                  in Performance Nutrition at RSC Anderlecht.
                </p>
              </Reveal>
              <Reveal delay={0.35}>
                <p className="text-body max-w-2xl mt-4">
                  My work sits at the intersection of science, sport and real-life application.
                  I am especially interested in football environments, where nutrition must go
                  beyond theory and become something athletes can actually use in training,
                  competition and recovery.
                </p>
              </Reveal>
              <Reveal delay={0.45}>
                <p className="text-body max-w-2xl mt-4">
                  Having lived sport from the inside across multiple disciplines, I approach
                  nutrition as a performance tool built on clarity, consistency, adaptation and trust.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.2} direction="right">
              <div className="relative mt-4 md:mt-12">
                <div className="overflow-hidden">
                  <motion.img
                    src={portraitImg}
                    alt="Guilherme Neves"
                    className="w-full aspect-[3/4] object-cover object-top grayscale-[20%]"
                    loading="lazy"
                    width={400}
                    height={533}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.6 }}
                  />
                </div>
                <div className="absolute -bottom-3 -left-3 bg-background px-3 py-1.5">
                  <p className="text-caption text-[10px]">Guilherme Neves — Porto / Brussels</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Why this work matters */}
      <section className="section-padding section-spacing">
        <div className="max-content grid md:grid-cols-2 gap-16">
          <Reveal>
            <div>
              <p className="text-caption mb-6">Why This Work Matters</p>
              <h2 className="text-headline">
                Nutrition knowledge only matters when it translates into action.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="space-y-6">
              <p className="text-body-lg">
                Most athletes don't lack information — they lack usable systems.
                The gap between knowing what to eat and consistently doing it under
                pressure, fatigue and competition demands is where real performance
                nutrition lives.
              </p>
              <p className="text-body-lg">
                I focus on closing that gap. Every resource, tool and system I build
                exists to make nutrition practical, repeatable and genuinely useful
                in the environments where it matters most.
              </p>
              <p className="text-body">
                This isn't about perfection or trend-chasing. It's about building things
                that survive the real complexity of training weeks, match days, travel
                and the human reality of being an athlete.
              </p>
            </div>
          </Reveal>
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
                title: "Practical",
                text: "If it doesn't work in a real training week, it doesn't work. Systems must survive the complexity of sport schedules, travel and competition pressure.",
              },
              {
                title: "Athlete-Centered",
                text: "The athlete is the user. Everything should be designed around how they actually live, train and compete — not around textbook ideals.",
              },
              {
                title: "Evidence-Based",
                text: "Grounded in science, shaped by application. Research informs the direction; practical experience determines the execution.",
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
              habit, and when discipline is designed into the structure — not left
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
                  <p className="text-body text-sm">FCNAUP — University of Porto</p>
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
              Interested in working together?
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-body-lg max-w-md mx-auto mt-4">
              I'm always open to meaningful conversations about performance, education and applied sport nutrition.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center mt-8 px-10 py-4 bg-foreground text-background font-display text-sm font-medium tracking-wide transition-all duration-300 hover:opacity-85"
            >
              Get in Touch
            </Link>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
