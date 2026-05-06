// ============================================================
// FILE: src/app/privacy/page.js
// PURPOSE: Privacy Policy page. Required for Google AdSense
//          approval, GDPR compliance, and user trust.
//          Covers data collection, cookies, and third parties.
//          Accessible at /privacy
// PLACEMENT: src/app/privacy/page.js (New File)
// ============================================================

import Link from 'next/link';
import { Shield, ArrowLeft } from 'lucide-react';

// ── SEO Metadata ─────────────────────────────────────────────
export const metadata = {
  title: 'Privacy Policy — Sand Calculator',
  description:
    'Read the Sand Calculator privacy policy. Learn how we collect, use, and protect your data when you use our free sand estimation tools.',
};

// ── Last updated date ────────────────────────────────────────
const LAST_UPDATED = 'January 1, 2025';

// ── Privacy sections data ────────────────────────────────────
const sections = [
  {
    id: '1',
    title: '1. Information We Collect',
    content: `Sand Calculator is designed to respect your privacy. When you use our sand
calculators, we do not require you to create an account or provide any personal
information such as your name, email address, or payment details.

We may automatically collect certain non-personally identifiable information when
you visit our website, including your browser type, operating system, referring URLs,
and pages visited. This information is collected through standard web server logs and
analytics tools to help us understand how visitors use our site and improve our services.

We do not collect or store the measurement values you enter into our calculators.
All calculations are performed locally in your browser and no calculation data is
transmitted to our servers.`,
  },
  {
    id: '2',
    title: '2. Cookies and Tracking Technologies',
    content: `Sand Calculator uses cookies and similar tracking technologies to enhance your
browsing experience and analyze website traffic. Cookies are small text files stored
on your device by your web browser.

We use the following types of cookies:

Essential Cookies: These cookies are necessary for the website to function correctly.
They enable core functionality such as page navigation and access to secure areas
of the website.

Analytics Cookies: We use Google Analytics to collect anonymous information about
how visitors use our website, including pages visited, time spent on pages, and
traffic sources. This data helps us improve our content and user experience.

Advertising Cookies: We may use Google AdSense to display advertisements on our
website. Google AdSense uses cookies to serve ads based on your prior visits to our
website and other websites on the internet. You can opt out of personalized
advertising by visiting Google's Ads Settings.

You can control and manage cookies through your browser settings. Please note that
disabling cookies may affect the functionality of our website.`,
  },
  {
    id: '3',
    title: '3. How We Use Your Information',
    content: `The information we collect is used solely to operate and improve Sand Calculator.
Specifically, we use the information to:

Analyze website traffic and user behavior to improve our calculators and content.
Monitor and maintain the technical performance and security of our website.
Understand which calculators and features are most useful to our visitors.
Comply with legal obligations and enforce our Terms of Use.

We do not sell, trade, or transfer your personally identifiable information to
outside parties. We do not use your information for direct marketing purposes
without your explicit consent.`,
  },
  {
    id: '4',
    title: '4. Third-Party Services',
    content: `Sand Calculator uses the following third-party services that may collect
information about you:

Google Analytics: We use Google Analytics to analyze website traffic. Google Analytics
collects information such as your IP address, browser type, and pages visited. This
information is processed by Google in accordance with their Privacy Policy. You can
opt out of Google Analytics tracking by installing the Google Analytics Opt-out
Browser Add-on.

Google AdSense: We may display advertisements served by Google AdSense. Google uses
cookies to serve ads based on your interests and browsing history. For more information
about how Google uses data, please visit Google's Privacy and Terms page.

Vercel: Our website is hosted on Vercel, which may collect server logs and performance
data. Vercel's data collection is governed by their Privacy Policy.

These third-party services have their own privacy policies and we encourage you to
review them. We are not responsible for the privacy practices of these third parties.`,
  },
  {
    id: '5',
    title: '5. Data Retention',
    content: `Sand Calculator does not store personal data on our servers beyond what is
necessary to operate the website. Server logs may be retained for a limited period
for security and debugging purposes before being automatically deleted.

Analytics data collected through Google Analytics is retained according to Google's
data retention policies. You can request deletion of your analytics data through
Google's tools.

Blog comments or any content submitted through our contact forms, if applicable,
may be retained for as long as necessary to fulfill the purpose for which it was
collected.`,
  },
  {
    id: '6',
    title: '6. Your Rights and Choices',
    content: `Depending on your location, you may have certain rights regarding your personal
data under applicable privacy laws including the General Data Protection Regulation
(GDPR) for users in the European Economic Area, the California Consumer Privacy Act
(CCPA) for California residents, and other applicable regional privacy laws.

These rights may include the right to access personal data we hold about you, the
right to request correction of inaccurate data, the right to request deletion of
your data, the right to object to or restrict processing of your data, and the right
to data portability.

To exercise any of these rights, please contact us using the information provided
in the Contact section of this policy. We will respond to your request within the
timeframe required by applicable law.

You may also opt out of interest-based advertising by visiting the Network Advertising
Initiative opt-out page or the Digital Advertising Alliance opt-out page.`,
  },
  {
    id: '7',
    title: '7. Children\'s Privacy',
    content: `Sand Calculator is not directed at children under the age of 13. We do not
knowingly collect personal information from children under 13 years of age. If you
are a parent or guardian and believe that your child has provided us with personal
information, please contact us immediately so that we can take appropriate action.

If we discover that we have inadvertently collected personal information from a child
under 13, we will promptly delete that information from our records.`,
  },
  {
    id: '8',
    title: '8. Security',
    content: `We take reasonable technical and organizational measures to protect the
information we collect against unauthorized access, disclosure, alteration, or
destruction. Our website is served over HTTPS to encrypt data transmitted between
your browser and our servers.

However, no method of transmission over the internet or method of electronic storage
is completely secure. While we strive to use commercially acceptable means to protect
your information, we cannot guarantee its absolute security.`,
  },
  {
    id: '9',
    title: '9. Changes to This Privacy Policy',
    content: `We may update this Privacy Policy from time to time to reflect changes in our
practices, technology, legal requirements, or other factors. When we make changes,
we will update the Last Updated date at the top of this page.

We encourage you to review this Privacy Policy periodically to stay informed about
how we are protecting your information. Your continued use of Sand Calculator after
any changes to this Privacy Policy constitutes your acceptance of the updated policy.`,
  },
  {
    id: '10',
    title: '10. Contact Us',
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy
or our data practices, please contact us at:

Sand Calculator
Email: privacy@sandcalc.com
Website: www.sandcalc.com

We will do our best to respond to your inquiry within 30 business days. If you are
located in the European Economic Area and believe we have not adequately addressed
your privacy concerns, you have the right to lodge a complaint with your local
data protection authority.`,
  },
];

// ── Privacy Policy Page Component ───────────────────────────
export default function PrivacyPage() {
  return (
    <div className="pt-20 pb-16">

      {/* ── Page Header ──────────────────────────────────── */}
      <div className="bg-gradient-to-b from-dark-900 to-dark-950 border-b border-gray-800/50 py-16">
        <div className="section-wrapper text-center">

          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-primary-600/10 border border-primary-500/20 rounded-full px-4 py-2 mb-4">
            <Shield className="w-4 h-4 text-primary-400" />
            <span className="text-primary-400 text-sm font-medium">
              Legal
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
            Privacy <span className="text-gradient">Policy</span>
          </h1>

          {/* Last updated */}
          <p className="text-gray-500 text-sm">
            Last updated: {LAST_UPDATED}
          </p>

        </div>
      </div>

      {/* ── Content Area ─────────────────────────────────── */}
      <div className="section-wrapper mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* ── Table of Contents Sidebar ────────────────── */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <div className="card-glass p-6 sticky top-24">

              <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 pb-3 border-b border-gray-700/50">
                Contents
              </h3>

              <nav className="flex flex-col gap-2">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#section-${section.id}`}
                    className="text-gray-400 hover:text-primary-400 text-xs leading-relaxed transition-colors duration-200"
                  >
                    {section.title}
                  </a>
                ))}
              </nav>

            </div>
          </div>

          {/* ── Main Content ───────────────────────────────── */}
          <div className="lg:col-span-3 order-1 lg:order-2">

            {/* Intro box */}
            <div className="card-glass p-6 mb-8 border-primary-500/20">
              <p className="text-gray-300 leading-relaxed">
                This Privacy Policy describes how Sand Calculator collects, uses,
                and protects information when you visit our website and use our
                free sand estimation tools. By using Sand Calculator, you agree
                to the collection and use of information in accordance with this policy.
              </p>
            </div>

            {/* Policy sections */}
            <div className="flex flex-col gap-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className="card-glass p-6 md:p-8"
                >
                  {/* Section title */}
                  <h2 className="text-white font-bold text-xl mb-4 pb-3 border-b border-gray-700/50">
                    {section.title}
                  </h2>

                  {/* Section content */}
                  <div className="flex flex-col gap-3">
                    {section.content.split('\n\n').map((paragraph, i) => (
                      paragraph.trim() !== '' && (
                        <p
                          key={i}
                          className="text-gray-400 text-sm leading-relaxed"
                        >
                          {paragraph.trim()}
                        </p>
                      )
                    ))}
                  </div>

                </div>
              ))}
            </div>

            {/* Back link */}
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}