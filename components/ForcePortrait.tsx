"use client"

import { useEffect, useState } from "react"

export default function ForcePortrait() {
  const [showOverlay, setShowOverlay] = useState(false)

  useEffect(() => {
    function checkOrientation() {
      const isMobile = window.innerWidth <= 900 && /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
      const isLandscape = window.matchMedia("(orientation: landscape)").matches
      setShowOverlay(isMobile && isLandscape)
    }
    checkOrientation()
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)
    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  if (!showOverlay) return null
  return (
    <div style={{
      position: "fixed",
      zIndex: 9999,
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(255,255,255,0.97)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      color: "#222",
      fontSize: "1.5rem",
      textAlign: "center",
      pointerEvents: "auto"
    }}>
      <div style={{maxWidth: 320}}>
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" style={{margin: "0 auto 1rem auto"}}><rect x="4" y="2" width="16" height="20" rx="3" fill="#eee" stroke="#888" strokeWidth="2"/><path d="M8 18h8" stroke="#888" strokeWidth="2" strokeLinecap="round"/><path d="M12 6v6" stroke="#888" strokeWidth="2" strokeLinecap="round"/><path d="M9 9h6" stroke="#888" strokeWidth="2" strokeLinecap="round"/></svg>
        <div>Пожалуйста, поверните ваше устройство в портретный режим для наилучшего восприятия.</div>
      </div>
    </div>
  )
}
