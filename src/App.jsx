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
import ProjectAccordion from './components/ProjectAccordion';
import SkillSection from './components/SkillSection';
import TestimonialSection from './components/TestimonialSection';
import LoadingScreen from './components/LoadingScreen';
import { AnimatePresence } from 'framer-motion';
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
  Code,
  LockKey,
  GitBranch,
  Sparkle,
  Hexagon,
  CodeBlock,
  Cloud,
  HardDrives,
  Folder,
  Key,
  ShieldCheck,
  ArrowUp,
  EnvelopeSimple
} from "@phosphor-icons/react";

if (typeof window !== 'undefined' && !window.__lenis) {
  window.__lenis = new Lenis({ anchors: true });
}

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: 'Skills', ariaLabel: 'View skills section', link: '#skills' },
  { label: 'Projects', ariaLabel: 'View projects section', link: '#projects' },
  { label: 'Winners', ariaLabel: 'View Winners section', link: '#Winners' },
  { label: 'Reviews', ariaLabel: 'View Reviews section', link: '#reviews' },
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


const newSkillsData = [
  {
    category: "BACKEND",
    items: [
      { name: "Node.js", icon: Hexagon, color: "#43853d" },
      { name: "Express.js", icon: CodeBlock, color: "#ffffff" },
      { name: "REST", icon: Cloud, color: "#007ACC" },
      { name: "WebSocket", icon: GlobeHemisphereWest, color: "#22d3ee" }
    ]
  },
  {
    category: "DATABASE",
    items: [
      { name: "MongoDB", icon: Folder, color: "#47A248" },
      { name: "Redis", icon: HardDrives, color: "#DC382D" },
      { name: "PostgreSQL", icon: Database, color: "#336791" },
      { name: "Mongoose", icon: CodeBlock, color: "#b91c1c" }
    ]
  },
  {
    category: "SECURITY",
    items: [
      { name: "JWT", icon: Key, color: "#d63aff" },
      { name: "Bcrypt", icon: ShieldCheck, color: "#a855f7" },
      { name: "OAuth", icon: LockKey, color: "#ffffff" },
      { name: "Rate Limiting", icon: Cloud, color: "#38bdf8" }
    ]
  },
  {
    category: "OTHERS",
    items: [
      { name: "Git", icon: GitBranch, color: "#F05032" },
      { name: "GitHub", icon: GithubLogo, color: "#ffffff" },
      { name: "GSAP", icon: Sparkle, color: "#88CE02" },
      { name: "Linux", icon: HardDrives, color: "#eab308" }
    ]
  }
];

const projectItems = [
  {
    label: 'Web3 • Android',
    title: 'nanobonds',
    description:
      '3-contract Solidity system — bond pool, ERC-20 share token, and yield logic — backed by IPFS-hosted metadata. Android client streams real-time APY, maturity, and cashflow data directly from on-chain state.',
    stack: ['Web3', 'Solidity', 'Android', 'IPFS'],
    link: 'https://github.com/BikramMondal5/Nano-Bond/tree/main/Android',
    color: '#120F17',
    icon: Cube,
    media: { type: 'video', url: '/videos/nanobonds.mp4' }
  },
  {
    label: 'Web3 • IPFS',
    title: 'w3deploy',
    description:
      '1-command IPFS pipeline that builds, pins to Pinata, and returns a verifiable CID. Hono API handles deploy webhooks and status; Algorand registry powers instant project lookup via CLI or MCP agent.',
    stack: ['Next.js', 'Hono API', 'IPFS/Pinata', 'Algorand'],
    link: 'https://github.com/Rakesh-ada/w3deploy',
    color: '#120F17',
    icon: GlobeHemisphereWest,
    media: { type: 'image', url: '/photos/web3deploy.png' }
  },
  {
    label: 'Offline-first',
    title: 'invo',
    description:
      'Offline-first inventory and POS on 4 indexed SQLite tables with a reconnect sync queue. Gemini RAG with 128-dim vector store powers AI insights; auto-generates weekly PDF reports across catalog, billing, and analytics.',
    stack: ['React Native (Expo)', 'SQLite', 'TypeScript', 'Google Gemini'],
    link: 'https://github.com/Rakesh-ada/InVo',
    color: '#120F17',
    icon: Database,
    media: { type: 'video', url: '/videos/invo.mp4' }
  },
  {
    label: 'Desktop',
    title: 'neo',
    description:
      'Always-on-top Electron assistant with 1-key global summon and dual AI engine that auto-switches between n8n and Gemini. Voice I/O via Google STT and ElevenLabs; ships 5+ importable n8n workflow templates.',
    stack: ['Electron', 'Node.js', 'Google Gemini', 'n8n', 'ElevenLabs'],
    link: 'https://github.com/Rakesh-ada/Neo',
    color: '#120F17',
    icon: Robot,
    media: { type: 'image', url: '/photos/Neo.png' }
  }
];

const MilestonesFlowItems = [
  {
    link: '#',
    text: 'EIBS 2.0 Finalist',
    marqueeText: '|EIBS 2.0|✦|FINALIST|✦|IIT KHARAGPUR|✦|',
    images: [
      '/photos/eibs.jpeg'
    ]
  },
  {
    link: '#',
    text: '2nd Runner Up Vibeathon',
    marqueeText: "|VIBEATHON|✦|2ND RUNNER UP|✦|DAKSHH'26|✦|",
    images: [
      '/photos/Vibe-A-thon.png'
    ]
  },
  {
    link: '#',
    text: 'EDUCHAIN S3 GLOBAL Finalist',
    marqueeText: '|EDUCHAIN S3|✦|GLOBAL FINALIST|✦|TOP 120 TEAMS|✦|',
    images: [
      '/photos/educhain.jpeg'
    ]
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
  const skillsDividerRef = useRef(null);
  const winsSectionRef = useRef(null);
  const projectsGridSectionRef = useRef(null);
  const [resumeViews, setResumeViews] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  useGSAP(() => {
    if (!skillsDividerRef.current || !skillsSectionRef.current) return;

    gsap.set(skillsDividerRef.current, {
      rotate: 0,
      transformOrigin: '50% 50%',
      force3D: true
    });

    const tween = gsap.to(skillsDividerRef.current, {
      rotate: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: skillsSectionRef.current,
        start: 'top 85%',
        end: 'bottom top',
        scrub: 1.8,
        invalidateOnRefresh: true
      }
    });

    ScrollTrigger.refresh();

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, { dependencies: [] });



  const handleAnimationComplete = () => {
    console.log('All letters have animated!');
  };

  const handleContactSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const message = String(formData.get('message') || '').trim();

    const subject = `Portfolio Contact from ${name || 'a visitor'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      message || 'Hi Rakesh,'
    ].join('\n');

    const mailtoUrl = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    form.reset();
  };

  const handleScrollToTop = () => {
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;

    if (lenis && typeof lenis.scrollTo === 'function') {
      lenis.scrollTo(0, { duration: 1.2 });
      return;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
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

  useEffect(() => {
    if (typeof document === 'undefined') {
      return undefined;
    }

    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;

    if (isLoading) {
      body.style.overflow = 'hidden';
      root.style.overflow = 'hidden';
    } else {
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
    }

    return () => {
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
    };
  }, [isLoading]);

  const formattedResumeViews = resumeViews.toLocaleString();
  const milestonesItemsForView = isMobile
    ? MilestonesFlowItems.map(item => {
        if (item.text.toLowerCase().includes('eibs')) return { ...item, text: 'EIBS 2.0' };
        if (item.text.toLowerCase().includes('vibeathon')) return { ...item, text: 'VIBEATHON' };
        if (item.text.toLowerCase().includes('educhain')) return { ...item, text: 'EDUCHAIN S3' };
        if (item.text.toLowerCase().includes('hack')) return { ...item, text: 'HACKHERITAGE' };
        return item;
      })
    : MilestonesFlowItems;

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      {!isLoading && <SmoothCursor />}
      <div 
        ref={appRef} 
        id="me" 
        className={`w-full min-h-screen bg-white overflow-x-hidden relative max-w-[100vw] ${isLoading ? 'h-screen overflow-hidden' : ''}`}
      >
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
            displayItemNumbering={false}
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
                text="RAKESH ADAK"
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
              className="mt-4 sm:mt-2 ml-0 sm:ml-2 md:ml-4 pr-0 sm:pr-8 md:pr-24 text-[clamp(1rem,2.2vw,1.6rem)] text-black/70 max-w-3xl mx-auto lg:mx-0 leading-snug tracking-tight text-center sm:text-left"
            >
              <p className="font-semibold">
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
                        className="w-full sm:w-auto text-base px-8 h-12 rounded-full bg-black text-white border border-black/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60"
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
            <div className="pointer-events-auto relative hidden min-h-[100svh] items-center justify-center pl-20 pt-10 lg:flex">
              <div className="relative w-full max-w-[420px] overflow-hidden rounded-[36px] border-[6px] border-white p-[8px] shadow-[0_0_0_2px_rgba(0,0,0,0.2),0_26px_56px_rgba(0,0,0,0.22)]">
                <img
                  src="/profile.png"
                  alt="Rakesh profile"
                  className="block h-[56vh] min-h-[360px] w-full rounded-[30px] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section ref={skillsSectionRef} id="skills" className="relative z-30 min-h-[34svh] md:h-[56svh] bg-[#120F17] text-white flex items-center">
        <div ref={skillsMenuRef} className="w-full flex items-center justify-start px-6 md:px-10">
          <div className="flex w-full items-center justify-between">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="top bottom"
              scrollEnd="bottom 50%"
              stagger={0.03}
              containerClassName="m-0"
              textClassName="text-left text-white uppercase font-extrabold tracking-tight text-[clamp(2.6rem,14vw,6.2rem)] md:text-[clamp(4rem,16vw,14rem)] leading-none whitespace-nowrap"
            >
              Skills
            </ScrollFloat>
            <img
              ref={skillsDividerRef}
              src="/icons/Abstract Shape.png"
              alt="decorative shape"
              className="pointer-events-none w-[5.2rem] h-[5.2rem] md:w-[15rem] md:h-[15rem] lg:w-[17rem] lg:h-[17rem] -translate-x-2 md:-translate-x-6 lg:-translate-x-8 object-contain shrink-0"
            />
          </div>
        </div>
      </section>

      <section className="relative z-30 min-h-[40svh] md:min-h-screen bg-[#120F17] text-white py-10 md:py-20">
        <SkillSection skillsData={newSkillsData} />
      </section>

      <section id="projects" className="relative z-30 min-h-[40svh] md:min-h-[100svh] bg-white text-black">
        <div className="min-h-[40svh] md:min-h-[100svh] w-full flex items-center justify-start px-6 md:px-10 py-16 md:py-0">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom 50%"
            stagger={0.03}
             containerClassName="m-0"
             textClassName="text-left text-black uppercase font-extrabold tracking-tight text-[clamp(2.6rem,14vw,6.2rem)] md:text-[clamp(4rem,16vw,14rem)] leading-none whitespace-nowrap"
          >
            Projects
          </ScrollFloat>
        </div>
      </section>

      <section ref={projectsGridSectionRef} className="relative z-30 w-full bg-white text-black pointer-events-auto">
        <ProjectAccordion items={projectItems} />
      </section>

      <section ref={winsSectionRef} id="Winners" className="relative z-30 min-h-[40svh] md:min-h-[100svh] bg-[#120F17] text-white flex items-center">
        <div className="w-full flex items-center justify-start px-6 md:px-10">
          <div className="flex w-full items-center justify-between">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="top bottom"
              scrollEnd="bottom 50%"
              stagger={0.03}
              containerClassName="m-0"
              textClassName="text-left text-white uppercase font-extrabold tracking-tight text-[clamp(2.6rem,14vw,6.2rem)] md:text-[clamp(4rem,16vw,14rem)] leading-none whitespace-nowrap"
            >
              Winners
            </ScrollFloat>
            
          </div>
        </div>
      </section>

      <section className="relative z-30 h-[100svh] md:h-screen bg-[#120F17] text-white overflow-hidden">
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
            autoItemHeight={isMobile}
          />
        </div>
      </section>

      <section id="reviews" className="relative z-40 min-h-[40svh] md:min-h-[100svh] bg-white text-black flex items-center">
        <div className="w-full flex items-center justify-start px-6 md:px-10 py-0">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom"
            scrollEnd="bottom 50%"
            stagger={0.03}
            containerClassName="m-0"
            textClassName="text-left text-black uppercase font-extrabold tracking-tight text-[clamp(2.6rem,14vw,6.2rem)] md:text-[clamp(4rem,16vw,14rem)] leading-none whitespace-nowrap"
          >
            Reviews
          </ScrollFloat>
        </div>
      </section>

      <TestimonialSection />


      <section id="contact" className="relative z-30 min-h-[100svh] overflow-hidden bg-[#120F17] text-white flex items-center py-16 md:py-20 lg:py-24">
        <div className="mx-auto w-full max-w-[1400px] px-6 md:px-10 relative">
          
          <div className="bg-[#0B0C10] text-white rounded-[2rem] shadow-[0_24px_80px_rgba(0,0,0,0.5)] p-4 md:p-6 lg:p-8 border border-white/5 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4">
              
              {/* Left Side: Info */}
              <div className="p-6 md:p-8 lg:p-10 flex flex-col gap-8 lg:gap-12">
                <div>
                  <div className="inline-block px-5 py-2 rounded-full bg-white text-black text-sm font-semibold mb-6 shadow-sm">
                    Get in touch
                  </div>
                  <h2 className="text-4xl md:text-5xl xl:text-[3.5rem] font-bold tracking-tight leading-[1.1] mb-6">
                    Let's build something<br />together.
                  </h2>
                  <p className="text-lg text-gray-400 leading-relaxed">
                    I'm actively looking for internships and open-source collaborations. Drop a message!
                  </p>
                </div>
                
                <div className="flex flex-col gap-6 text-gray-300">
                  <div className="flex items-center gap-4">
                    <div>
                      <GlobeHemisphereWest size={24} weight="regular" className="text-white" />
                    </div>
                    <div>
                      <p className="text-white text-base">West Bengal, India</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div>
                      <EnvelopeSimple size={24} weight="regular" className="text-white" />
                    </div>
                    <div>
                      <a href={`mailto:${contactEmail}`} className="text-base text-white hover:underline transition-colors">{contactEmail}</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Form (The White Box) */}
              <div className="bg-white text-black p-6 md:p-8 lg:p-10 rounded-[1.5rem] shadow-xl flex flex-col justify-center self-center w-full">
                <h3 className="text-2xl md:text-3xl font-extrabold mb-8">Send a message</h3>
                
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <Input
                      id="contact-name"
                      name="name"
                      placeholder="Username *"
                      required
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-5 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all text-black placeholder:text-gray-500 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <Input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="Phone number *"
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-5 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all text-black placeholder:text-gray-500 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <Input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="Email address *"
                      required
                      className="w-full bg-white border border-gray-200 rounded-lg px-4 py-5 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all text-black placeholder:text-gray-500 shadow-sm"
                    />
                  </div>
                  
                  <div>
                    <Textarea
                      id="contact-message"
                      name="message"
                      placeholder="Message *"
                      rows={4}
                      required
                      className="resize-none w-full bg-white border border-gray-200 rounded-lg px-4 py-5 focus-visible:ring-1 focus-visible:ring-black focus-visible:border-black transition-all text-black placeholder:text-gray-500 shadow-sm"
                    />
                  </div>
                  
                  <div className="pt-2">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto px-8 rounded-lg bg-[#0B0C10] text-white font-medium hover:bg-black transition-colors py-6 text-sm shadow-md"
                    >
                      Submit Inquiry
                    </Button>
                  </div>
                </form>
              </div>
              
            </div>
          </div>
          

        </div>
      </section>
    </>
  );
}

export default App;

