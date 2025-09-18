"use client"

import { ArrowUp } from "lucide-react"
import { useState, useEffect } from "react"
import { EditableText } from "@/components/editable/editable-text"
import { useInlineEditor } from "@/contexts/inline-editor-context"

type NavItem = { name: string; url: string }
type FooterInfo = {
  showFooter: boolean
  name: string
  description: string
  showQuickLinks: boolean
  quickLinksTitle: string
  showContactInfo: boolean
  contactTitle: string
  phone: string
  email: string
  location: string
  copyright: string
  showMadeWith: boolean
  madeWithLocation: string
  showTemplateCredit: boolean
  templateCreator: { name: string; youtube: string; website: string; email: string }
  showScrollTop: boolean
}

export function Footer() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const currentYear = new Date().getFullYear()

  const [navItems, setNavItems] = useState<NavItem[]>([
    { name: "소개", url: "#about" },
    { name: "프로젝트", url: "#projects" },
    { name: "연락처", url: "#contact" },
  ])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const defaultInfo: FooterInfo = {
    showFooter: true,
    name: "유복길",
    description: "개발,디자이너,크리에이터 지망생",
    showQuickLinks: true,
    quickLinksTitle: "빠른 링크",
    showContactInfo: true,
    contactTitle: "연락처",
    phone: "010-0000-0000",
    email: "유복길@복길.com",
    location: "대한민국",
    copyright: "",
    showMadeWith: false,
    madeWithLocation: "",
    showTemplateCredit: false,
    templateCreator: { name: "", youtube: "", website: "", email: "" },
    showScrollTop: true,
  }

  const [footerInfo, setFooterInfo] = useState<FooterInfo>(defaultInfo)

  // 데이터 로드
  useEffect(() => {
    const savedData = getData("footer-info")
    if (savedData) {
      setFooterInfo({ ...defaultInfo, ...savedData, showMadeWith: false, showTemplateCredit: false })
    }

    const navConfig = getData("nav-config") as { items?: Array<{ name: string; url: string; icon: string; show: boolean }> } | null
    if (navConfig?.items) {
      const visibleItems = navConfig.items.filter(i => i.show).map(i => ({ name: i.name, url: i.url }))
      if (visibleItems.length > 0) setNavItems(visibleItems)
    }
  }, [getData])

  const updateFooterInfo = async (key: keyof FooterInfo, value: string | boolean) => {
    if (["showMadeWith", "madeWithLocation", "showTemplateCredit", "templateCreator"].includes(key as string)) return
    const newInfo = { ...footerInfo, [key]: value } as FooterInfo
    setFooterInfo(newInfo)
    saveData("footer-info", newInfo)
    await saveToFile("footer", "Info", newInfo)
  }

  if (!footerInfo.showFooter && !isEditMode) return null

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {(footerInfo.name || footerInfo.showQuickLinks || footerInfo.showContactInfo) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* 브랜드/이름 */}
            {footerInfo.name && (
              <div>
                <h3 className="font-bold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.name}
                    onChange={(v) => updateFooterInfo("name", v)}
                    storageKey="footer-name"
                  />
                </h3>
                {footerInfo.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <EditableText
                      value={footerInfo.description}
                      onChange={(v) => updateFooterInfo("description", v)}
                      storageKey="footer-description"
                      multiline
                    />
                  </p>
                )}
              </div>
            )}

            {/* 빠른 링크 */}
            {footerInfo.showQuickLinks && navItems.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.quickLinksTitle}
                    onChange={(v) => updateFooterInfo("quickLinksTitle", v)}
                    storageKey="footer-quicklinks-title"
                  />
                </h4>
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        const el = document.querySelector(item.url)
                        if (el) el.scrollIntoView({ behavior: "smooth" })
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 연락처 */}
            {footerInfo.showContactInfo && (footerInfo.phone || footerInfo.email || footerInfo.location) && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.contactTitle}
                    onChange={(v) => updateFooterInfo("contactTitle", v)}
                    storageKey="footer-contact-title"
                  />
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {footerInfo.phone && (
                    <p>
                      <EditableText value={footerInfo.phone} onChange={(v) => updateFooterInfo("phone", v)} storageKey="footer-phone" />
                    </p>
                  )}
                  {footerInfo.email && (
                    <p>
                      <EditableText value={footerInfo.email} onChange={(v) => updateFooterInfo("email", v)} storageKey="footer-email" />
                    </p>
                  )}
                  {footerInfo.location && (
                    <p>
                      <EditableText value={footerInfo.location} onChange={(v) => updateFooterInfo("location", v)} storageKey="footer-location" />
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {isEditMode ? (
              <EditableText
                value={footerInfo.copyright || `© ${currentYear} ${footerInfo.name || "Portfolio"}. All rights reserved.`}
                onChange={(v) => updateFooterInfo("copyright", v)}
                storageKey="footer-copyright"
              />
            ) : (
              <p>{footerInfo.copyright || `© ${currentYear} ${footerInfo.name || "Portfolio"}. All rights reserved.`}</p>
            )}
          </div>

          {/* (템플릿 크레딧 블록 제거됨) */}

          {footerInfo.showScrollTop && (
            <button onClick={scrollToTop} className="p-2 rounded-full hover:bg-muted transition-colors" aria-label="맨 위로">
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
