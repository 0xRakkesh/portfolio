import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Quotes, Plus, X } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Style, Avatar } from '@dicebear/core';
import definition from '@dicebear/styles/notionists.json' with { type: 'json' };

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "We improved development speed without compromising UI quality. Reusable patterns and structure helped us maintain consistency.",
    author: "Neha Patel",
    role: "Frontend Architect at ScaleGrid",
  },
  {
    quote: "The impact was immediate. Our workflows are smoother, and the team spends more time on building features than styling.",
    author: "James Turner",
    role: "Marketing Manager at Growth",
  },
  {
    quote: "We cut down UI iteration cycles significantly. Instead of rebuilding components, we now extend existing patterns and focus on logic.",
    author: "Amit Sharma",
    role: "Frontend Engineer at NT",
  },
  {
    quote: "Components are well-structured and highly modular. Now expanding our UI is intuitive and structurally sound.",
    author: "Sarah Jenkins",
    role: "UI Designer",
  },
  {
    quote: "Our designers and developers are finally speaking the same language. The consistency across all our digital products is incredible.",
    author: "Michael Chang",
    role: "Product Lead at Flow",
  }
];

const avatarStyle = new Style(definition);

function createAvatarSvg(seed) {
  const avatar = new Avatar(avatarStyle, { seed });
  return avatar.toString();
}

function createReviewCard(review) {
  return {
    ...review,
    quote: review.review,
    author: review.username,
    role: review.occupation,
  };
}

export default function TestimonialSection() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const progressBarRef = useRef(null);
  const [reviews, setReviews] = useState(testimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    occupation: '',
    review: '',
  });

  useEffect(() => {
    let cancelled = false;

    const loadReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) return;

        const data = await response.json();
        if (cancelled || !Array.isArray(data.reviews) || data.reviews.length === 0) return;

        setReviews([...data.reviews, ...testimonials]);
      } catch {
        // Keep local fallback reviews if the API is unavailable.
      }
    };

    loadReviews();

    return () => {
      cancelled = true;
    };
  }, []);

  const renderedReviews = useMemo(() => reviews.map((review, index) => {
    const avatarSeed = review.username ?? review.author ?? `review-${index}`;
    const avatarSvg = createAvatarSvg(avatarSeed);

    return {
      ...review,
      avatarSeed,
      avatarSvg,
    };
  }), [reviews]);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormError('');
    setFormData({ username: '', occupation: '', review: '' });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError('');

    if (!formData.username.trim() || !formData.occupation.trim() || !formData.review.trim()) {
      setFormError('Fill username, occupation, and review.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      const nextReview = createReviewCard(data.review);
      setReviews((current) => [nextReview, ...current]);
      closeModal();
    } catch (error) {
      setFormError(error.message || 'Failed to submit review.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useGSAP(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Calculate total scroll distance based on the width of all cards minus viewport width
    const getScrollAmount = () => {
      const wrapperWidth = wrapper.scrollWidth;
      const viewportWidth = window.innerWidth;
      // Add a little padding to the end so the last card isn't flush against the right edge
      return -(wrapperWidth - viewportWidth + 40);
    };

    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      // Desktop: Horizontal pin and scrub
      const tween = gsap.to(wrapper, {
        x: getScrollAmount,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => `+=${wrapper.scrollWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true,
      });

      gsap.to(progressBarRef.current, {
        width: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${wrapper.scrollWidth}`,
          scrub: 1,
        }
      });
    });

    mm.add("(max-width: 767px)", () => {
      // Mobile: Native horizontal scrolling without pin for better mobile UX
      // No GSAP scroll trigger pinning needed on mobile
      gsap.to(progressBarRef.current, {
        width: "33%", // static fallback or we could link to horizontal scroll event
      });
    });

    const closeOnLeaveTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      onLeave: () => closeModal(),
      onLeaveBack: () => closeModal(),
    });

    return () => {
      closeOnLeaveTrigger.kill();
      mm.revert();
    };
  }, { scope: sectionRef });

  return (
    <section 
      ref={sectionRef} 
      className="relative z-30 bg-white text-black h-[100svh] flex flex-col justify-center overflow-hidden"
    >
      <div className="w-full pl-6 md:pl-10 pb-8">
        <div 
          ref={wrapperRef}
          className="flex gap-6 flex-nowrap overflow-x-auto md:overflow-visible hide-scrollbar snap-x snap-mandatory w-full md:w-max justify-center md:justify-start px-6 md:px-0"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {renderedReviews.map((testimonial, i) => (
            <div 
              key={i} 
              className="min-w-[320px] md:min-w-[400px] w-[320px] md:w-[400px] h-[360px] md:h-[400px] flex-shrink-0 flex flex-col justify-between bg-gray-50 border border-gray-200 rounded-3xl p-8 snap-center hover:shadow-lg transition-shadow duration-300"
            >
              <div>
                <Quotes size={40} weight="regular" className="text-gray-300 mb-8" />
                <p className="text-lg text-gray-800 leading-relaxed line-clamp-4">
                  {testimonial.quote}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={`data:image/svg+xml;utf8,${encodeURIComponent(testimonial.avatarSvg || createAvatarSvg(testimonial.author))}`}
                    alt={`${testimonial.author} avatar`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-black text-sm">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
          {/* spacer at the end for mobile padding */}
          <div className="w-4 md:hidden shrink-0"></div>
        </div>

        <div className="flex items-center justify-between mt-12 md:mt-20 pr-6 md:pr-10 max-w-[1600px]">
          <div className="h-[2px] bg-black/10 w-full rounded-full mr-8 relative">
             <div ref={progressBarRef} className="absolute top-0 left-0 h-full w-0 bg-black rounded-full"></div>
          </div>
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/10 bg-black/85 backdrop-blur-xl flex items-center justify-center hover:bg-black/95 transition-all shadow-[0_8px_24px_rgba(0,0,0,0.35)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] group hover:scale-[1.03]"
              aria-label="Add review"
            >
              <Plus size={28} weight="bold" className="text-white transition-transform duration-500 group-hover:rotate-90" />
            </button>
          </div>
        </div>
      </div>
      {isModalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-[2rem] bg-white text-black shadow-[0_24px_80px_rgba(0,0,0,0.35)] border border-black/10">
            <div className="flex items-center justify-between px-6 py-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl font-extrabold tracking-tight">Submit a review</h3>
                <p className="text-sm text-gray-500 leading-relaxed">If you know the profile owner, share your review here.</p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center"
                aria-label="Close review form"
              >
                <X size={20} weight="bold" />
              </button>
            </div>
            <form className="space-y-4 px-6 py-6" onSubmit={handleSubmit}>
              <div>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 outline-none focus:border-black"
                  placeholder="Your name"
                />
              </div>
              <div>
                <input
                  id="occupation"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 outline-none focus:border-black"
                  placeholder="Frontend Engineer"
                />
              </div>
              <div>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleChange}
                  rows="5"
                  className="w-full rounded-2xl border border-black/10 bg-gray-50 px-4 py-3 outline-none focus:border-black resize-none"
                  placeholder="Write your review..."
                />
              </div>
              {formError ? <p className="text-sm font-medium text-red-600">{formError}</p> : null}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-full bg-black px-5 py-3 font-semibold text-white disabled:opacity-60"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </section>
  );
}
