/** @fileoverview Implements the home-page vision hero and its CEO message and video dialogs. */

import { useState } from 'react'
import { siteContent } from '../data/content'
import { Icon } from './Icon'
import { Modal } from './Modal'

/** Presents the home-page vision statement and CEO message or video dialogs. */
export function VisionHero() {
  const [messageOpen, setMessageOpen] = useState(false)
  const [videoOpen, setVideoOpen] = useState(false)

  return (
    <>
      <section className="vision-hero" aria-labelledby="vision-heading">
        <img src="/assets/vision-mountain.png" alt="Hiker overlooking mountain ridges at sunset" className="vision-image" />
        <div className="vision-overlay" />
        <div className="vision-content">
          <p className="mb-2 text-sm font-medium text-slate-100">{siteContent.heroEyebrow}</p>
          <h1 id="vision-heading" className="text-[2.7rem] font-semibold leading-[0.98] tracking-[-0.05em] text-white sm:text-[3.25rem]">
            {siteContent.visionTitle}
          </h1>
          <p className="mt-4 max-w-[34rem] text-[15px] leading-6 text-slate-100/90 sm:text-base">
            {siteContent.visionStatement}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button className="hero-primary" type="button" onClick={() => setVideoOpen(true)}>
              <Icon name="play" className="h-4 w-4 fill-current" />
              Watch CEO Update <span className="hidden sm:inline">(5 min)</span>
            </button>
            <button className="hero-link" type="button" onClick={() => setMessageOpen(true)}>
              Read the Message <Icon name="arrow" className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <Modal open={messageOpen} onClose={() => setMessageOpen(false)} eyebrow="A message from the CEO" title={siteContent.ceoMessage.title} size="md">
        <div className="space-y-4 text-[15px] leading-7 text-slate-300">
          {siteContent.ceoMessage.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <div className="mt-7 border-t border-white/10 pt-5">
          <p className="font-medium text-white">Alex Rivera</p>
          <p className="mt-0.5 text-sm text-slate-500">Chief Executive Officer · Sample content</p>
        </div>
      </Modal>

      <Modal open={videoOpen} onClose={() => setVideoOpen(false)} eyebrow="CEO update" title="Video placeholder" size="md">
        <div className="video-placeholder">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500 text-white shadow-[0_0_40px_rgba(139,92,246,.45)]">
            <Icon name="play" className="ml-1 h-7 w-7 fill-current" />
          </span>
        </div>
        <p className="mt-5 text-sm leading-6 text-slate-300">
          No video file has been supplied. Connect an approved video source or place a local media file in the public assets folder to enable playback.
        </p>
      </Modal>
    </>
  )
}
