import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import DotField from './components/DotField';
import StaggeredMenu from './components/StaggeredMenu';
import SplitText from './components/SplitText';
import BorderGlow from './components/BorderGlow';
import SpotlightCard from './components/SpotlightCard';
import ScrollFloat from './components/ScrollFloat';
import FlowingMenu from './components/FlowingMenu';
import ScrollStack from './components/ScrollStack';
import { Button } from './components/ui/button';
import { SmoothCursor } from './components/ui/smooth-cursor';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import {
  Cube,
  GlobeHemisphereWest,
  Database,
  Robot,
  GithubLogo,
  LinkedinLogo,
  Code
} from "@phosphor-icons/react";

if (typeof window !== 'undefined' && !window.__lenis) {
  window.__lenis = new Lenis({ anchors: true });
}

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: 'Skills', ariaLabel: 'View skills section', link: '#skills' },
  { label: 'Projects', ariaLabel: 'View projects section', link: '#projects' },
  { label: 'Milestones', ariaLabel: 'View Milestones section', link: '#Milestones' },
  { label: 'Reach Out', ariaLabel: 'Reach Out section', link: '#contact' }
];

const socialItems = [
  { label: 'LeetCode', link: 'https://leetcode.com/u/rakeshAdak/' },
  { label: 'GitHub', link: 'https://github.com/Rakesh-ada' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rakeshadak08/' }
];

const socialIconMap = {
  LeetCode: Code,
  GitHub: GithubLogo,
  LinkedIn: LinkedinLogo
};

const skillsFlowItems = [
  {
    link: '#',
    text: 'Backend',
    marqueeText: '|NODE|✦|EXPRESS|✦|REST|✦|'
  },
  {
    link: '#',
    text: 'Database',
    marqueeText: '|MONGODB|✦|REDIS|✦|POSTGRESS|✦|'
  },
  {
    link: '#',
    text: 'Security',
    marqueeText: '|JWT|✦|BCRYPT|✦|OAUTH|✦|'
  },
  {
    link: '#',
    text: 'Others',
    marqueeText: '|GIT|✦|GITHUB|✦|GSAP|✦|'
  }
];

const projectItems = [
  {
    label: 'Web3 • Android',
    title: 'nanobonds',
    description:
      'DeFi platform enabling fractional investment in government bonds using stablecoins (USDT/USDC). Features real-time yield visualization, asset proofs on IPFS, and automated smart contract accounting.',
    stack: ['Web3', 'Solidity', 'Android', 'IPFS'],
    link: 'https://github.com/BikramMondal5/Nano-Bond/tree/main/Android',
    color: '#120F17',
    icon: Cube
  },
  {
    label: 'Web3 • IPFS',
    title: 'w3deploy',
    description:
      'Helps developers ship frontend projects from GitHub or MCP-driven agent workflows to IPFS natively. Features reliable deploy pipelines, verifiable blockchain-linked history via Algorand, and Smolify-assisted stack classification.',
    stack: ['Next.js', 'Hono API', 'IPFS/Pinata', 'Algorand'],
    link: 'https://github.com/Rakesh-ada/w3deploy',
    color: '#120F17',
    icon: GlobeHemisphereWest
  },
  {
    label: 'Offline-first',
    title: 'Invo',
    description:
      'Modern offline-first inventory management built with React Native (Expo) and SQLite. Features POS QR payments, AI-assisted BI insights (Gemini), vector embeddings, and weekly PDF reports.',
    stack: ['React Native (Expo)', 'SQLite', 'TypeScript', 'Google Gemini'],
    link: 'https://github.com/Rakesh-ada/InVo',
    color: '#120F17',
    icon: Database
  },
  {
    label: 'Desktop',
    title: 'Neo',
    description:
      'Floating, always-on-top desktop chat app powered by a Dual AI Engine (Google Gemini & n8n automation). Supports custom workflows, voice capabilities, and smart switching.',
    stack: ['Electron', 'Node.js', 'Google Gemini', 'n8n', 'ElevenLabs'],
    link: 'https://github.com/Rakesh-ada/Neo',
    color: '#120F17',
    icon: Robot
  }
];

const MilestonesFlowItems = [
  {
    link: '#',
    text: 'EIBS 2.0 Finalist',
    marqueeText: '|EIBS 2.0|✦|FINALIST|✦|'
  },
  {
    link: '#',
    text: '2nd Runner Up Vibeathon',
    marqueeText: '|VIBEATHON|✦|2ND RUNNER UP|✦|'
  },
  {
    link: '#',
    text: 'HackHeriatge 3rd Rank',
    marqueeText: '|HACKHERIATGE|✦|3RD RANK|✦|'
  }
];

const contactEmail = 'rakesh904664@gmail.com';
const RESUME_VIEWS_ENDPOINT = '/api/resume-views';

function App() {
  const appRef = useRef(null);
  const dotFieldRef = useRef(null);
  const lanyardRef = useRef(null);
  const heroRef = useRef(null);
  const bioRef = useRef(null);
  const ctaRef = useRef(null);
  const skillsSectionRef = useRef(null);
  const skillsMenuRef = useRef(null);
  const projectsGridSectionRef = useRef(null);
  const [resumeViews, setResumeViews] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useGSAP(
    () => {
      const lenis = window.__lenis;

      // Synchronize Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      const lenisRaf = (time) => {
        lenis.raf(time * 1000);
      };

      gsap.ticker.add(lenisRaf);
      gsap.ticker.lagSmoothing(0);

      gsap.set([bioRef.current, ctaRef.current], { autoAlpha: 0, y: 32 });

      const introTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      introTl
        .from(dotFieldRef.current, { autoAlpha: 0, duration: 1.1 })
        .from(lanyardRef.current, { autoAlpha: 0, x: 80, duration: 1.0 }, 0.15)
        .from(heroRef.current, { autoAlpha: 0, x: -36, duration: 0.85 }, 0.25)
        .to(bioRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.55)
        .to(ctaRef.current, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.65);

      gsap.to(lanyardRef.current, {
        y: 10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });

      const cleanupHandlers = [];

      gsap.set(skillsMenuRef.current, { autoAlpha: 0, y: 80 });
      gsap
        .timeline({
          scrollTrigger: {
            trigger: skillsSectionRef.current,
            start: 'top 78%',
            toggleActions: 'play none none reverse'
          }
        })
        .to(skillsMenuRef.current, { autoAlpha: 1, y: 0, duration: 0.95, ease: 'power3.out' });

      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        const grid = projectsGridSectionRef.current
          ? projectsGridSectionRef.current.querySelector('.bento-section')
          : null;
        const cards = projectsGridSectionRef.current
          ? Array.from(projectsGridSectionRef.current.querySelectorAll('.card'))
          : [];

        if (grid) gsap.set(grid, { autoAlpha: 1, y: 0, scale: 1 });
        if (!cards.length) return;
        gsap.set(cards, { autoAlpha: 1, y: 0, scale: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const grid = projectsGridSectionRef.current
          ? projectsGridSectionRef.current.querySelector('.bento-section')
          : null;
        const cards = projectsGridSectionRef.current
          ? Array.from(projectsGridSectionRef.current.querySelectorAll('.card'))
          : [];

        if (!grid || !cards.length) return;

        gsap.set(grid, { autoAlpha: 0, y: 42, scale: 0.985 });
        gsap.set(cards, { autoAlpha: 0, y: 34, scale: 0.975, rotateZ: -0.75 });

        const tl = gsap.timeline({
          defaults: { duration: 1.15, ease: 'power3.out' },
          scrollTrigger: {
            trigger: projectsGridSectionRef.current,
            start: 'top 80%',
            end: '+=950',
            scrub: 1.35
          }
        });

        tl.to(grid, { autoAlpha: 1, y: 0, scale: 1 }, 0);
        tl.to(cards, { autoAlpha: 1, y: 0, scale: 1, rotateZ: 0, stagger: 0.1 }, 0.05);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => {
        cleanupHandlers.forEach(fn => fn());
        mm.revert();
        gsap.ticker.remove(lenisRaf);
        lenis.off('scroll', ScrollTrigger.update);
      };
    },
    { scope: appRef }
  );

  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const message = String(formData.get('message') || '').trim();

    const subject = 'Portfolio contact';
    const body = [
      message || 'Hi Rakesh,'
    ].join('\n');

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    form.reset();
  };

  const fetchCounterValue = async (options = {}) => {
    const response = await fetch(RESUME_VIEWS_ENDPOINT, {
      method: 'GET',
      cache: 'no-store',
      ...options,
    });
    if (!response.ok) {
      const error = new Error('Counter request failed');
      error.status = response.status;
      throw error;
    }
    const data = await response.json();
    if (!data || typeof data.value !== 'number') {
      throw new Error('Counter response invalid');
    }
    return data.value;
  };

  const handleResumeClick = async () => {
    try {
      const value = await fetchCounterValue({
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      });
      setResumeViews(value);
    } catch (error) {
      // Ignore counter failures to avoid blocking downloads.
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    let isMounted = true;

    const loadResumeViews = async () => {
      try {
        const value = await fetchCounterValue();
        if (isMounted) {
          setResumeViews(value);
        }
      } catch (error) {
        if (isMounted) {
          setResumeViews(0);
        }
      }
    };

    loadResumeViews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMobileState = () => setIsMobile(mediaQuery.matches);
    updateMobileState();
    mediaQuery.addEventListener('change', updateMobileState);
    return () => mediaQuery.removeEventListener('change', updateMobileState);
  }, []);

  const formattedResumeViews = resumeViews.toLocaleString();
  const milestonesItemsForView = isMobile
    ? MilestonesFlowItems.map(item => {
        if (item.text.toLowerCase().includes('eibs')) return { ...item, text: 'EIBS 2.0' };
        if (item.text.toLowerCase().includes('vibeathon')) return { ...item, text: 'VIBEATHON' };
        if (item.text.toLowerCase().includes('hack')) return { ...item, text: 'HACKHERITAGE' };
        return item;
      })
    : MilestonesFlowItems;

  return (
    <>
      <SmoothCursor />
      <div ref={appRef} id="me" className="w-full min-h-screen bg-white overflow-x-hidden relative max-w-[100vw]">
        <div ref={dotFieldRef} className="absolute inset-0 z-0">
          <DotField
            dotRadius={1.5}
            dotSpacing={14}
            bulgeStrength={67}
            glowRadius={160}
            sparkle
            waveAmplitude={0}
            cursorRadius={0}
            cursorForce={0.1}
            bulgeOnly
            gradientFrom="#A855F7"
            gradientTo="#5227FF"
            glowColor="transparent"
            faceImageSrc="/profile.png"
          />
        </div>

        <div className="absolute inset-0 z-20 pointer-events-none overflow-visible">
          <StaggeredMenu
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering={true}
            menuButtonColor="#000000"
            changeMenuColorOnOpen={false}
            colors={['#B497CF', '#5227FF']}
            logoUrl="/path-to-your-logo.svg"
            accentColor="#5227FF"
            onMenuOpen={() => console.log('Menu opened')}
            onMenuClose={() => console.log('Menu closed')}
          />
        </div>

        <div className="relative z-10 min-h-[100svh] text-black pointer-events-none">
          <div className="mx-auto grid min-h-[100svh] w-full max-w-[1600px] grid-cols-1 lg:grid-cols-2">
          <div
            ref={heroRef}
            className="w-full min-h-[100svh] px-6 sm:px-8 md:px-10 flex flex-col justify-center items-center lg:items-start pointer-events-auto relative z-20"
          >
            <h1 className="mt-20 sm:mt-24 md:mt-48 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.95] text-center lg:text-left max-w-5xl mx-auto lg:mx-0 text-black pb-2">
              <SplitText
                text="Rakesh Adak"
                className=""
                delay={20}
                duration={1.0}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="inherit"
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback
              />
            </h1>
            <div
              ref={bioRef}
              className="mt-4 sm:mt-2 ml-0 sm:ml-2 md:ml-4 pr-0 sm:pr-8 md:pr-24 text-base sm:text-lg md:text-2xl text-gray-800 max-w-3xl mx-auto lg:mx-0 leading-relaxed text-center sm:text-left"
            >
              <p className="font-medium">
                Backend Developer focused on <span style={{ color: '#5227FF' }}>Node.js</span>, <span style={{ color: '#5227FF' }}>Express.js</span>, and <span style={{ color: '#5227FF' }}>MongoDB</span>, building secure REST APIs and scalable web applications with clean, maintainable code.
              </p>

              <div ref={ctaRef} className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 w-full">
                <div data-cta-btn className="w-full sm:w-auto">
                  <BorderGlow
                    className="!p-0 !rounded-full w-full sm:w-auto"
                    borderRadius={999}
                    backgroundColor="#ffffff"
                    colors={['#22d3ee', '#a855f7', '#f472b6']}
                    glowColor="265 85 70"
                    glowRadius={28}
                    glowIntensity={0.9}
                    fillOpacity={0.45}
                  >
                    <a
                      href="/resume.pdf"
                      download="resume.pdf"
                      className="pointer-events-auto"
                      onClick={handleResumeClick}
                    >
                      <Button
                        size="lg"
                        className="w-full sm:w-auto text-base px-8 h-12 bg-white text-black rounded-full z-10 border border-black/10"
                      >
                        Get Resume
                      </Button>
                    </a>
                  </BorderGlow>
                </div>
                <div className="pointer-events-auto inline-flex items-center gap-3">
                  {socialItems.map(item => {
                    const Icon = socialIconMap[item.label] || Code;
                    return (
                      <BorderGlow
                        key={item.label}
                        className="!p-0 !rounded-full w-12 h-12"
                        borderRadius={999}
                        backgroundColor="#ffffff"
                        colors={['#22d3ee', '#a855f7', '#f472b6']}
                        glowColor="265 85 70"
                        glowRadius={18}
                        glowIntensity={0.85}
                        fillOpacity={0.45}
                      >
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={item.label}
                          className="inline-flex h-full w-full items-center justify-center rounded-full border border-black/10 bg-white text-black shadow-sm"
                        >
                          <Icon size={20} weight="bold" />
                        </a>
                      </BorderGlow>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
            <div className="pointer-events-auto relative hidden min-h-[100svh] items-center justify-center px-8 pt-10 lg:flex">
              <div className="relative w-full max-w-[320px] overflow-hidden rounded-[32px] border-[5px] border-white p-[6px] shadow-[0_0_0_2px_rgba(0,0,0,0.2),0_20px_45px_rgba(0,0,0,0.18)]">
                <img
                  src="/profile.png"
                  alt="Rakesh profile"
                  className="block h-[44vh] min-h-[260px] w-full rounded-[26px] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section ref={skillsSectionRef} id="skills" className="relative z-30 min-h-[100svh] bg-[#120F17] text-white">
        <div ref={skillsMenuRef} className="min-h-[100svh] w-full flex items-center justify-center px-6 md:px-10">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="m-0"
            textClassName="text-white uppercase font-extrabold tracking-tight text-[clamp(4rem,16vw,14rem)] leading-none"
          >
            Skills
          </ScrollFloat>
        </div>
      </section>

      <section className="relative z-30 min-h-[100svh] md:h-[120vh] bg-[#120F17] text-white">
        <div className="h-full w-full">
          <FlowingMenu
            items={skillsFlowItems}
            speed={14}
            textColor="#ffffff"
            bgColor="#120F17"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="#ffffff"
          />
        </div>
      </section>

      <section id="projects" className="relative z-30 min-h-[100svh] md:h-screen bg-white text-black">
        <div className="h-full w-full flex items-center justify-center px-6 md:px-10">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
             containerClassName="m-0"
             textClassName="text-black uppercase font-extrabold tracking-tight text-[clamp(4rem,16vw,14rem)] leading-none"
          >
            Projects
          </ScrollFloat>
        </div>
      </section>

      <section ref={projectsGridSectionRef} className="relative z-30 w-full bg-white text-black">
        <ScrollStack items={projectItems} />
      </section>

      <section id="Milestones" className="relative z-30 min-h-[100svh] md:h-screen bg-[#120F17] text-white">
        <div className="h-full w-full flex items-center justify-center px-6 md:px-10">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="m-0"
            textClassName="text-white uppercase font-extrabold tracking-tight whitespace-nowrap text-[clamp(2.75rem,11vw,10.5rem)] leading-none"
          >
            Milestones
          </ScrollFloat>
        </div>
      </section>

      <section className="relative z-30 min-h-[100svh] md:h-screen bg-[#120F17] text-white overflow-hidden">
        <div className="h-full w-full">
          <FlowingMenu
            items={milestonesItemsForView}
            speed={14}
            textColor="#ffffff"
            bgColor="#120F17"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="#ffffff"
            itemHeightClassName="h-[28vh] sm:h-[30vh] md:h-[33vh]"
          />
        </div>
      </section>

      <section className="relative z-30 min-h-[100svh] md:h-screen bg-white text-black">
        <div className="h-full w-full flex items-center justify-center px-6 md:px-10">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="m-0"
            textClassName="text-black uppercase font-extrabold tracking-tight whitespace-nowrap text-[clamp(2.75rem,11vw,10.5rem)] leading-none"
          >
            ReachOut
          </ScrollFloat>
        </div>
      </section>

      <section id="contact" className="relative z-30 bg-white text-black min-h-[100svh]">
        <div className="mx-auto w-full max-w-6xl px-6 md:px-10 min-h-[100svh] flex items-start md:items-center py-16">
          <div className="grid w-full gap-10 md:gap-12 md:grid-cols-[1.1fr_1fr] items-start">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-5">Reach Out</p>
              <h2 className="text-black font-extrabold tracking-tighter text-[clamp(3rem,3.5vw,5rem)] leading-[0.95]">
                Let&apos;s build something <br /> together.
              </h2>
              <p className="mt-8 text-lg text-gray-600 max-w-md leading-relaxed">
                Share your idea, timeline, or just say hello. I reply quickly and love collaborating on ambitious builds.
              </p>
              <div className="mt-8 text-sm text-gray-500">
                Prefer email? Reach me directly at
                <a href={`mailto:${contactEmail}`} className="ml-2 font-semibold text-black hover:underline transition-all">
                  {contactEmail}
                </a>
              </div>
            </div>

            <form
              onSubmit={handleContactSubmit}
              className="rounded-3xl border border-gray-400 bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6 flex flex-col"
            >
              <div className="space-y-3">
                <label htmlFor="contact-message" className="text-sm font-semibold text-gray-700">
                  Message
                </label>
                <Textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about your project..."
                  rows={6}
                  required
                  className="resize-none rounded-xl border-gray-300 bg-gray-50/50 p-4 text-black placeholder:text-gray-400 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all"
                />
              </div>

              <div className="space-y-3 pt-2">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full rounded-xl bg-black py-6 text-base font-semibold text-white shadow-md hover:bg-gray-900 transition-all hover:scale-[1.02]"
                >
                  Send Email
                </Button>
                <p className="text-center text-xs text-gray-400">
                  This opens your default email app with the message prefilled.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
