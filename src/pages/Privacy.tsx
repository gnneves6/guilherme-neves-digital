import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import PlanGrid from "@/components/motion/PlanGrid";
import { LINKS } from "@/data/links";

/**
 * What happens to what people type into this site.
 *
 * Two forms here collect personal data: the enquiry on `/contact` and the
 * reference card request at the end of the five checks. Both write to a
 * database, and the second one is the beginning of a mailing list. Under GDPR
 * that needs to be stated somewhere a person can find before they type, and
 * until now it was stated nowhere at all.
 *
 * Written as a description of what the code actually does rather than as a
 * template. Every claim below is checkable against `Contact.tsx`, `LawKeep.tsx`
 * and the Supabase tables they write to, which is the only way a notice like
 * this stays true: if the behaviour changes and this page does not, the page
 * becomes a lie rather than merely out of date.
 *
 * It is a plain notice, not legal advice, and it is deliberately short. It
 * should be read by someone who knows Portuguese and EU data law before it is
 * relied on, and the retention period below is a stated intention rather than
 * an enforced deletion job.
 */
const Privacy = () => (
  <Layout>
    <SEO
      title="Privacy, Guilherme Neves"
      description="What this site collects, why, where it is kept, and how to have it removed."
      path="/privacy"
    />

    <section className="section-padding section-spacing relative">
      <PlanGrid />
      <div className="max-content relative">
        <Reveal>
          <p className="text-caption mb-6">Privacy</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="text-display max-w-3xl">
            What happens to what you type here.
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-body-lg max-w-2xl mt-8">
            Short, because there is not much to say. This site is run by one
            person, it has no advertising, and it does not sell anything about
            you to anybody.
          </p>
        </Reveal>
      </div>
    </section>

    <section className="section-padding pb-24">
      <div className="max-content max-w-2xl space-y-10">
        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Who is responsible
            </h2>
            <p className="text-body mt-3">
              Guilherme Neves, in Porto, Portugal. Everything below is handled
              by me personally. If you want to ask anything about it, write to{" "}
              <a href={`mailto:${LINKS.EMAIL}`} className="link-underline">
                {LINKS.EMAIL}
              </a>{" "}
              and I will answer myself.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              What is collected, and only when you send it
            </h2>
            <p className="text-body mt-3">
              Nothing is collected by browsing. There are two forms on this
              site, and both are optional.
            </p>
            <ul className="mt-4 space-y-3">
              <li className="text-body">
                <span className="font-medium text-foreground">The enquiry form.</span>{" "}
                Your name, email, organisation if you give one, which kind of
                work you are asking about, and what you wrote. I use it to
                answer you.
              </li>
              <li className="text-body">
                <span className="font-medium text-foreground">The reference card.</span>{" "}
                Your name and email. The card itself is a free download and
                needs no form at all, so if you fill this one in, it is because
                you want to hear from me when there is something new. That is a
                mailing list, and this line is me saying so plainly.
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Where it is kept
            </h2>
            <p className="text-body mt-3">
              In a database hosted by Supabase, inside the European Union. Only
              I have access to it. It is not shared with anyone, not used for
              advertising, and not sold.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              For how long
            </h2>
            <p className="text-body mt-3">
              Enquiries are kept while a conversation is live and for a
              reasonable period after, so I can remember what we discussed.
              Mailing list entries are kept until you ask to come off, and one
              email from you is enough to do that.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              What you can ask for
            </h2>
            <p className="text-body mt-3">
              A copy of what I hold about you, a correction, or deletion. Also
              to be taken off the list at any time, without giving a reason and
              without it affecting anything else. Write to{" "}
              <a href={`mailto:${LINKS.EMAIL}`} className="link-underline">
                {LINKS.EMAIL}
              </a>
              . If you think I have handled your data badly, you can complain to
              the Comissão Nacional de Proteção de Dados in Portugal.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div>
            <h2 className="font-display text-xl font-semibold text-foreground">
              Cookies, and what I do count
            </h2>
            <p className="text-body mt-3">
              No cookies, no advertising, and nothing that follows you to
              another site. I do count pages, because otherwise I am rebuilding
              this thing blind. Each view records four things: which page, which
              site sent you if any, whether your screen is a phone, a tablet or
              a desktop, and a random number that lives in your tab and
              disappears when you close it. That number exists only so I can
              tell one person reading five pages from five people reading one.
              No address, no name, nothing that survives the visit, and no
              third party involved: it goes into the same database as the forms
              above and nowhere else.
            </p>
            <p className="text-body mt-3">
              Fonts are loaded from Google Fonts, which means your browser makes
              a request to Google to fetch them.
            </p>
          </div>
        </Reveal>

        <Reveal>
          <div className="pt-2">
            <Link to="/contact" className="text-sm font-display link-underline">
              Back to getting in touch &rarr;
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  </Layout>
);

export default Privacy;
