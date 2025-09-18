"use client"

import { ArrowUp, Heart, Youtube, Globe, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { EditableText } from "@/components/editable/editable-text"
import { useInlineEditor } from "@/contexts/inline-editor-context"

export function Footer() {
  const { getData, saveData, isEditMode, saveToFile } = useInlineEditor()
  const currentYear = new Date().getFullYear()
  
  // 헤더의 네비게이션 데이터 가져오기 - 기본값 설정
  const [navItems, setNavItems] = useState<Array<{name: string, url: string}>>([
    { name: "소개", url: "#about" },
    { name: "프로젝트", url: "#projects" },
    { name: "연락처", url: "#contact" }
  ])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // 기본 데이터
  const defaultInfo = {
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
    showMadeWith: "",
    madeWithLocation: "",
    showTemplateCredit: "",
    templateCreator: {"name":"","youtube":"","website":"","email":""},
    showScrollTop: true
  }

  const [footerInfo, setFooterInfo] = useState(defaultInfo)

  // localStorage에서 데이터 로드
  useEffect(() => {
    // 푸터 정보 로드
    const savedData = getData('footer-info')
    if (savedData) {
      // Made with와 템플릿 크레딧은 편집 불가이므로 기본값 유지
      setFooterInfo({ 
        ...defaultInfo, 
        ...savedData,
        showMadeWith: defaultInfo.showMadeWith,
        madeWithLocation: defaultInfo.madeWithLocation,
        showTemplateCredit: defaultInfo.showTemplateCredit,
        templateCreator: defaultInfo.templateCreator
      })
    }
    
    // 헤더 네비게이션 데이터도 함께 로드
    const navConfig = getData('nav-config') as { items?: Array<{name: string, url: string, icon: string, show: boolean}> } | null
    if (navConfig?.items) {
      // show가 true인 항목만 필터링하여 푸터에 표시
      const visibleItems = navConfig.items
        .filter(item => item.show)
        .map(item => ({ name: item.name, url: item.url }))
      if (visibleItems.length > 0) {
        setNavItems(visibleItems)
      }
    }
  }, [isEditMode])

  const updateFooterInfo = async (key: string, value: string | boolean) => {
    // Made with와 템플릿 크레딧 관련 필드는 수정 불가
    if (key === '' || key === '' || 
        key === '' || key === '') {
      return
    }
    const newInfo = { ...footerInfo, [key]: value }
    setFooterInfo(newInfo)
    saveData('footer-info', newInfo)
    // 파일로도 저장
    await saveToFile('footer', 'Info', newInfo)
  }
  
  // 푸터 전체를 표시하지 않음
  if (!footerInfo.showFooter && !isEditMode) {
    return null
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 상단 섹션 */}
        {(footerInfo.name || footerInfo.showQuickLinks || footerInfo.showContactInfo) && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* 브랜드/이름 */}
            {footerInfo.name && (
              <div>
                <h3 className="font-bold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.name}
                    onChange={(value) => updateFooterInfo('name', value)}
                    storageKey="footer-name"
                  />
                </h3>
                {footerInfo.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <EditableText
                      value={footerInfo.description}
                      onChange={(value) => updateFooterInfo('description', value)}
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
                    onChange={(value) => updateFooterInfo('quickLinksTitle', value)}
                    storageKey="footer-quicklinks-title"
                  />
                </h4>
                <div className="flex flex-col space-y-2">
                  {navItems.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const element = document.querySelector(item.url)
                        if (element) {
                          element.scrollIntoView({ behavior: "smooth" })
                        }
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 연락처 정보 */}
            {footerInfo.showContactInfo && (footerInfo.phone || footerInfo.email || footerInfo.location) && (
              <div>
                <h4 className="font-semibold text-foreground mb-3">
                  <EditableText
                    value={footerInfo.contactTitle}
                    onChange={(value) => updateFooterInfo('contactTitle', value)}
                    storageKey="footer-contact-title"
                  />
                </h4>
                <div className="space-y-2 text-sm text-muted-foreground">
                  {footerInfo.phone && (
                    <p>
                      <EditableText
                        value={footerInfo.phone}
                        onChange={(value) => updateFooterInfo('phone', value)}
                        storageKey="footer-phone"
                      />
                    </p>
                  )}
                  {footerInfo.email && (
                    <p>
                      <EditableText
                        value={footerInfo.email}
                        onChange={(value) => updateFooterInfo('email', value)}
                        storageKey="footer-email"
                      />
                    </p>
                  )}
                  {footerInfo.location && (
                    <p>
                      <EditableText
                        value={footerInfo.location}
                        onChange={(value) => updateFooterInfo('location', value)}
                        storageKey="footer-location"
                      />
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* 하단 카피라이트 */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            {isEditMode ? (
              <EditableText
                value={footerInfo.copyright || `© ${currentYear} ${footerInfo.name || 'Portfolio'}. All rights reserved.`}
                onChange={(value) => updateFooterInfo('copyright', value)}
                storageKey="footer-copyright"
              />
            ) : (
              <p>{footerInfo.copyright || `© ${currentYear} ${footerInfo.name || 'Portfolio'}. All rights reserved.`}</p>
            )}
          </div>
          
          {/* 맨 위로 버튼 */}
          {footerInfo.showScrollTop && (
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="맨 위로"
            >
              <ArrowUp className="h-4 w-4 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
