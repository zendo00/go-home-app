// 語言字典：支持繁體、簡體、英文

export type Locale = 'zh-HK' | 'zh-CN' | 'en';

export const translations = {
  'zh-HK': {
    // Settings 頁面
    'settings.title': '設置',
    'settings.homeAddress': '屋企地址 (Home Address)',
    'settings.homeAddressPlaceholder': '輸入你的屋企地址...（例如：中環國際金融中心 12 樓 123 室）',
    'settings.preview': '預覽：',
    'settings.saveAddress': '儲存地址',
    'settings.saveSuccess': '儲存成功',
    'settings.display': '顯示設定 (Display)',
    'settings.fontSize': '字體大小 (Font Size)',
    'settings.fontSize.small': '標準',
    'settings.fontSize.medium': '大',
    'settings.fontSize.large': '超大',
    'settings.companyLegal': '公司與法律資訊',
    'settings.about': '關於我們',
    'settings.privacy': '隱私政策',
    'settings.terms': '使用條款',
    'settings.contact': '聯絡我們',
    
    // Home 頁面
    'home.go': 'GO',
    'home.home': 'HOME',
    'home.driving': '開車',
    'home.transit': '公交',
    'home.walking': '行路',
    'home.returnHome': '回家',
    'home.cancel': '取消',
    'home.homeTitle': '回家',
    
    // Modal
    'modal.destination': '請輸入目的地',
    'modal.departure': '出發',
    'modal.setHome': '設定住家地址',
    'modal.close': '關閉',
    'modal.saveAddress': '儲存地址',
    'modal.saveSuccess': '儲存成功',
    'modal.preview': '預覽：',
    'modal.go': '出發',
    
    // Legal
    'legal.companyName': 'Zendo Holdings Limited',
    'legal.copyright': '版權所有',
    'legal.privacyTitle': '隱私政策',
    'legal.termsTitle': '使用條款',
    'legal.contactTitle': '聯絡我們',
    'legal.aboutTitle': '關於 Go Home',
  },
  
  'zh-CN': {
    'settings.title': '设置',
    'settings.homeAddress': '家庭地址 (Home Address)',
    'settings.homeAddressPlaceholder': '输入你的家庭地址...（例如：中环国际金融中心 12 楼 123 室）',
    'settings.preview': '预览：',
    'settings.saveAddress': '保存地址',
    'settings.saveSuccess': '保存成功',
    'settings.display': '显示设置 (Display)',
    'settings.fontSize': '字体大小 (Font Size)',
    'settings.fontSize.small': '标准',
    'settings.fontSize.medium': '大',
    'settings.fontSize.large': '超大',
    'settings.companyLegal': '公司与法律信息',
    'settings.about': '关于我们',
    'settings.privacy': '隐私政策',
    'settings.terms': '使用条款',
    'settings.contact': '联系我们',
    
    'home.go': 'GO',
    'home.home': 'HOME',
    'home.driving': '开车',
    'home.transit': '公交',
    'home.walking': '走路',
    'home.returnHome': '回家',
    'home.cancel': '取消',
    'home.homeTitle': '回家',
    
    'modal.destination': '请输入目的地',
    'modal.departure': '出发',
    'modal.setHome': '设定家庭地址',
    'modal.close': '关闭',
    'modal.saveAddress': '保存地址',
    'modal.saveSuccess': '保存成功',
    'modal.preview': '预览：',
    'modal.go': '出发',
    
    'legal.companyName': 'Zendo Holdings Limited',
    'legal.copyright': '版权所有',
    'legal.privacyTitle': '隐私政策',
    'legal.termsTitle': '使用条款',
    'legal.contactTitle': '联系我们',
    'legal.aboutTitle': '关于 Go Home',
  },
  
  'en': {
    'settings.title': 'Settings',
    'settings.homeAddress': 'Home Address',
    'settings.homeAddressPlaceholder': 'Enter your home address... (e.g., 12th Floor, ICC, Central)',
    'settings.preview': 'Preview:',
    'settings.saveAddress': 'Save Address',
    'settings.saveSuccess': 'Saved Successfully',
    'settings.display': 'Display Settings',
    'settings.fontSize': 'Font Size',
    'settings.fontSize.small': 'Standard',
    'settings.fontSize.medium': 'Large',
    'settings.fontSize.large': 'Extra Large',
    'settings.companyLegal': 'Company & Legal Info',
    'settings.about': 'About Us',
    'settings.privacy': 'Privacy Policy',
    'settings.terms': 'Terms of Use',
    'settings.contact': 'Contact Us',
    
    'home.go': 'GO',
    'home.home': 'HOME',
    'home.driving': 'Driving',
    'home.transit': 'Transit',
    'home.walking': 'Walking',
    'home.returnHome': 'Return Home',
    'home.cancel': 'Cancel',
    'home.homeTitle': 'Return Home',
    
    'modal.destination': 'Enter Destination',
    'modal.departure': 'Go',
    'modal.setHome': 'Set Home Address',
    'modal.close': 'Close',
    'modal.saveAddress': 'Save Address',
    'modal.saveSuccess': 'Saved Successfully',
    'modal.preview': 'Preview:',
    'modal.go': 'Go',
    
    'legal.companyName': 'Zendo Holdings Limited',
    'legal.copyright': 'All Rights Reserved',
    'legal.privacyTitle': 'Privacy Policy',
    'legal.termsTitle': 'Terms of Use',
    'legal.contactTitle': 'Contact Us',
    'legal.aboutTitle': 'About Go Home',
  },
};

export const languages = [
  { code: 'zh-HK', name: '繁體中文', flag: '🇭🇰' },
  { code: 'zh-CN', name: '简体中文', flag: '🇨🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
] as const;

export function t(key: keyof typeof translations['zh-HK'], locale: Locale): string {
  return translations[locale][key] || translations['zh-HK'][key] || key;
}
