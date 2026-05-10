import { useRef } from 'react';
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
import Lanyard from './components/Lanyard';
import ScrollFloat from './components/ScrollFloat';
import FlowingMenu from './components/FlowingMenu';
import ScrollStack from './components/ScrollStack';
import { Button } from './components/ui/button';
import {
  Cube,
  GlobeHemisphereWest,
  Database,
  Robot
} from "@phosphor-icons/react";

if (typeof window !== 'undefined' && !window.__lenis) {
  window.__lenis = new Lenis({ anchors: true });
}

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: 'Me', ariaLabel: 'Go to me section', link: '#me' },
  { label: 'Skills', ariaLabel: 'View skills section', link: '#skills' },
  { label: 'Projects', ariaLabel: 'View projects section', link: '#projects' },
  { label: 'Milestones', ariaLabel: 'View Milestones section', link: '#Milestones' }
];

const socialItems = [
  { label: 'LeetCode', link: 'https://leetcode.com/u/rakeshAdak/' },
  { label: 'GitHub', link: 'https://github.com/Rakesh-ada' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/rakeshadak08/' }
];

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
    color: '#5227FF',
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
    color: '#5227FF',
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
      const ctas = ctaRef.current ? Array.from(ctaRef.current.querySelectorAll('[data-cta-btn]')) : [];
      ctas.forEach(btn => {
        const handleEnter = () => gsap.to(btn, { y: -5, scale: 1.02, duration: 0.22, ease: 'power2.out' });
        const handleLeave = () => gsap.to(btn, { y: 0, scale: 1, duration: 0.3, ease: 'power3.out' });
        btn.addEventListener('mouseenter', handleEnter);
        btn.addEventListener('mouseleave', handleLeave);
        cleanupHandlers.push(() => {
          btn.removeEventListener('mouseenter', handleEnter);
          btn.removeEventListener('mouseleave', handleLeave);
        });
      });

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

  return (
    <>
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

        <div
          ref={lanyardRef}
          className="absolute right-[-800px] left-0 top-[-80px] flex justify-center items-center z-10 pointer-events-auto overflow-hidden"
        >
          <Lanyard position={[0, 10, 25]} gravity={[0, -40, 0]} scale={0.7} />
        </div>

        <div className="relative z-10 min-h-screen text-black pointer-events-none">
          <div
            ref={heroRef}
            className="w-full lg:w-1/2 min-h-screen px-6 md:px-10 flex flex-col justify-center pointer-events-auto relative z-20"
          >
            <h1 className="mt-32 md:mt-48 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95] text-left max-w-5xl text-black pb-2">
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
                textAlign="left"
                onLetterAnimationComplete={handleAnimationComplete}
                showCallback
              />
            </h1>
            <div
              ref={bioRef}
              className="mt-2 ml-2 md:ml-4 pr-8 md:pr-24 text-xl md:text-3xl text-gray-800 max-w-3xl leading-relaxed text-left"
            >
              <p className="font-medium">
                Backend Developer focused on Node.js, Express.js, and MongoDB, building secure REST APIs and scalable web applications with clean, maintainable code.
              </p>

              <div ref={ctaRef} className="mt-10 flex flex-wrap gap-4">
                <div data-cta-btn>
                  <SpotlightCard
                    className="!p-0 !bg-[#5227FF] !border-none !rounded-full flex !shadow-sm"
                    spotlightColor="rgba(255, 255, 255, 0.4)"
                  >
                    <a
                      href="/resume.pdf"
                      download="resume.pdf"
                      className="pointer-events-auto"
                    >
                      <Button
                        size="lg"
                        className="text-base px-8 h-12 bg-transparent hover:bg-white/10 text-white rounded-full z-10 border border-transparent"
                      >
                        Get Resume
                      </Button>
                    </a>
                  </SpotlightCard>
                </div>

                <div data-cta-btn>
                  <BorderGlow
                    borderRadius={9999}
                    backgroundColor="#ffffff"
                    animated={false}
                    className="!border-none !shadow-sm flex"
                    edgeSensitivity={60}
                    glowColor="180 151 207"
                  >
                    <a
                      href="https://www.linkedin.com/in/rakeshadak08/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pointer-events-auto"
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-8 h-12 rounded-full border-purple-200 hover:bg-purple-50 bg-transparent"
                      >
                        Contact Me
                      </Button>
                    </a>
                  </BorderGlow>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section ref={skillsSectionRef} id="skills" className="relative z-30 min-h-screen bg-[#120F17] text-white">
        <div ref={skillsMenuRef} className="min-h-screen w-full flex items-center justify-center px-6 md:px-10">
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

      <section className="relative z-30 h-[120vh] bg-[#120F17] text-white">
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

      <section id="projects" className="relative z-30 h-screen bg-white text-black">
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

      <section id="Milestones" className="relative z-30 h-screen bg-[#120F17] text-white">
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

      <section className="relative z-30 h-screen bg-[#120F17] text-white overflow-hidden">
        <div className="h-full w-full">
          <FlowingMenu
            items={MilestonesFlowItems}
            speed={14}
            textColor="#ffffff"
            bgColor="#120F17"
            marqueeBgColor="#ffffff"
            marqueeTextColor="#120F17"
            borderColor="#ffffff"
            itemHeightClassName="h-[33vh] md:h-[33vh] lg:h-[33vh]"
          />
        </div>
      </section>

      <footer className="relative z-30 bg-black text-white border-t border-white/15">
        <div className="h-screen w-full border-t border-white/10 flex items-center justify-center px-6 md:px-10">
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="top bottom-=10%"
            scrollEnd="bottom center"
            stagger={0.03}
            containerClassName="m-0"
            textClassName="text-white uppercase font-extrabold tracking-tight text-[clamp(3rem,14vw,12rem)] leading-none"
          >
            The End
          </ScrollFloat>
        </div>
      </footer>
    </>
  );
}

export default App;

