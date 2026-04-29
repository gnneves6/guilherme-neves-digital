import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import portraitImg from "@/assets/guilherme-portrait.jpg";

const IdentitySection = () => {
  return (
    <section className="section-padding section-spacing">
      <div className="max-content">
        <div className="grid md:grid-cols-[1fr,320px] lg:grid-cols-[1fr,380px] gap-12 md:gap-20 items-center">
          <div>
            <Reveal>
              <p className="text-caption mb-6">Presence</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-headline max-w-3xl">
                Athlete by nature.<br />Nutritionist by purpose.
              </h2>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-body-lg max-w-2xl mt-6">
                Before I studied performance, I lived sport from the inside.
                That shapes how I build nutrition systems: practical, clear,
                human and designed for real environments.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/about"
                className="inline-block mt-8 text-body text-sm link-underline hover:text-foreground transition-colors"
              >
                More about me →
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.3} direction="right">
            {/* data-portrait so the real image can be swapped easily later */}
            <div className="relative group" data-portrait>
              <div className="overflow-hidden">
                <motion.img
                  src={portraitImg}
                  alt="Guilherme Neves"
                  className="w-full aspect-[3/4] object-cover object-top"
                  loading="lazy"
                  width={380}
                  height={510}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ filter: "grayscale(15%) contrast(1.05)" }}
                />
              </div>
              <motion.div
                className="absolute -bottom-3 -left-3 bg-background px-4 py-2 border border-border/50"
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <p className="text-caption text-[10px]">Porto — Brussels</p>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default IdentitySection;