import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";

const About = () => {
  return (
    <Layout>
      {/* Intro */}
      <section className="section-padding section-spacing">
        <div className="max-content">
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
              I work at the intersection of sport, nutrition science and practical
              education — building systems that help athletes and performance
              environments operate with clarity.
            </p>
          </Reveal>
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
                <div className="space-y-4">
                  <h3 className="font-display text-xl font-medium text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-body">{item.text}</p>
                </div>
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
        </div>
      </section>

      <div className="section-padding max-content">
        <div className="divider" />
      </div>

      {/* Looking Outward */}
      <section className="section-padding section-spacing">
        <div className="max-content">
          <Reveal>
            <p className="text-caption mb-6">Looking Outward</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="text-headline max-w-3xl">
              International ambition. Meaningful work. Long-term vision.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-body-lg max-w-2xl mt-6">
              I'm building toward a career defined by contribution to elite sport
              environments internationally. The ambition is clear: create
              genuinely useful systems, work with high-performance organisations,
              and continuously raise the standard of what practical sport
              nutrition looks like.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-body-lg max-w-2xl mt-4">
              Not for visibility. For impact. For building things that last and
              environments that perform better because of how they think about
              nutrition.
            </p>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
};

export default About;
