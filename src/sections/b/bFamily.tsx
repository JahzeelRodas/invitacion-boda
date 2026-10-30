import { designB } from '../../config/designB'
import { WaveBand } from '../../components/decor/bWaves'
import { ChurchIcon, RingsIcon } from '../../components/decor/bIcons'
import { Reveal, ScriptTitle } from './bShared'

/* ════════════════════════════════════════════════════════════════════════════
   6 · FAMILIA — bendición con padres, padrinos de religión y de civil.
   ══════════════════════════════════════════════════════════════════════════ */

export function BFamily() {
  const { family } = designB
  return (
    <>
      {/* Bendición + padres */}
      <section id="b-padres" className="bg-bPaper px-6 py-12 text-center sm:py-16">
        <Reveal>
          <h2 className="mx-auto max-w-[420px] font-bParis text-[34px] leading-[1.25] text-bHead sm:text-[42px]">
            {family.blessingTitle}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <FamilyGroup label={family.parents.groomLabel} names={family.parents.groomNames} className="mt-10" />
        </Reveal>
        <Reveal delay={180}>
          <FamilyGroup label={family.parents.brideLabel} names={family.parents.brideNames} className="mt-9" />
        </Reveal>
      </section>

      {/* Padrinos */}
      <WaveBand id="b-padrinos" band="navy" topWave bottomWave>
        <ScriptTitle text={family.godparentsTitle} />
      </WaveBand>
      <div className="bg-bPaper px-6 pb-14 pt-12 text-center sm:pb-18 sm:pt-14">
        {family.godparents.map((group, i) => (
          <Reveal key={group.label} delay={i * 90} className={i === 0 ? '' : 'mt-12'}>
            <div className="mx-auto flex w-fit grid-block items-center justify-center">
              {group.icon === 'church' ? (
                <ChurchIcon className="h-24 w-24 sm:h-28 sm:w-28" />
              ) : (
                <RingsIcon className="h-24 w-24 sm:h-28 sm:w-28" />
              )}
            </div>
            <FamilyGroup label={group.label} names={group.names} className="mt-3" />
          </Reveal>
        ))}
      </div>
    </>
  )
}

function FamilyGroup({ label, names, className }: { label: string; names: string[]; className?: string }) {
  return (
    <div className={className}>
      <h3 className="font-bQuatt text-[22px] font-bold tracking-wide text-bHead sm:text-[25px]">{label}</h3>
      <p className="mt-1 font-bQuatt text-[24px] leading-[1.35] text-bBody sm:text-[27px]">
        {names.map((n) => (
          <span key={n} className="block">
            {n}
          </span>
        ))}
      </p>
    </div>
  )
}
