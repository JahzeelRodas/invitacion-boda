import { wedding } from '../config/wedding'
import Reveal from '../components/animation/Reveal'
import ParallaxImage from '../components/animation/ParallaxImage'
import { SectionHeader } from '../components/layout/SectionHeader'

/** Historia de la pareja: relato editable y tres momentos con fotografía. */
export default function OurStorySection() {
  const { story } = wedding

  return (
    <section id="historia" className="relative mx-auto max-w-5xl px-6 py-24 md:py-32" aria-labelledby="historia-title">
      <h2 id="historia-title" className="sr-only">
        {story.title}
      </h2>

      <SectionHeader eyebrow="Nuestra historia" title={story.title} />

      <Reveal>
        <p className="mx-auto mt-9 max-w-2xl text-center font-serif text-lg leading-relaxed text-warm md:text-[1.2rem]">
          {story.intro}
        </p>
      </Reveal>

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {story.moments.map((moment, index) => (
          <div key={moment.label} className="grid items-center gap-9 md:grid-cols-2 md:gap-16">
            <Reveal className={index % 2 === 1 ? 'md:order-2' : undefined}>
              <ParallaxImage
                src={moment.image}
                alt={moment.alt}
                className="aspect-[4/5] w-full md:aspect-[3/4]"
                amount={16}
              />
            </Reveal>

            <div className={index % 2 === 1 ? 'md:order-1' : undefined}>
              <Reveal>
                <p className="font-script text-[1.7rem] leading-none text-gold">{moment.label}</p>
              </Reveal>
              <Reveal delay={0.06}>
                <h3 className="mt-3 font-serif text-2xl font-medium text-ink md:text-[1.75rem]">{moment.title}</h3>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-4 text-sm leading-[1.9] text-warm md:text-[15px]">{moment.text}</p>
              </Reveal>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
