# Go Home App 開發手冊 v2.2 (長者極簡導航版 - 深度連結無縫跳轉)

**專案名稱**: Go Home  
**目標用戶**: 長者 (65+)  
**核心價值**: 零學習成本、極簡介面、無縫跳轉、零成本運營  
**開發模式**: PWA (Progressive Web App) + 靜態托管 (Vercel)  
**最後更新**: 2026-04-10  
**文件狀態**: **最終確認版 (v2.2 - 深度連結無 API 依賴)**  

---

## 1. 技術架構 (Tech Stack)

### 1.1 核心框架 (極簡靜態)

| 層級 | 技術選擇 | 理由 | 備註 |
|------|----------|------|------|
| **前端框架** | Next.js 14 (App Router) + React 18 | 靜態生成 (SSG) 支援、開發體驗佳 | 輸出純靜態 HTML/JS |
| **UI 庫** | Tailwind CSS + shadcn/ui | 快速構建大按鈕、高對比設計 | 無依賴 |
| **PWA 引擎** | `next-pwa` (簡化配置) | 實現「網頁即 App」安裝體驗 | 僅快取靜態資源 |
| **狀態管理** | React Context (內建) | 無需額外庫，僅需儲存家庭地址 | 輕量級 |
| **地圖整合** | **Google Maps 深度連結 (Deep Link)** | **無需 API Key、零成本、無縫跳轉** | **核心創新點** |
| **錯誤追蹤** | Sentry (免費層) | 可選，僅監控前端 JS 錯誤 | 非必須 |
| **Analytics** | Vercel Analytics (內建) | 免費、隱私友善 | 非必須 |

### 1.2 部署策略：Vercel 靜態托管

| 項目 | 配置 | 說明 |
|------|------|------|
| **主機** | **Vercel (免費層)** | **無需 VPS、無需伺服器、無需資料庫** |
| **部署方式** | GitHub 自動同步 | `git push` → Vercel 自動構建 → 上線 |
| **成本** | **$0/月** | 免費層包含無限流量、自動 HTTPS、全球 CDN |
| **網域** | `gohome-app.vercel.app` (免費) 或自訂網域 | 無需購買新網域 |
| **更新流程** | 修改代碼 → Git Push → 自動部署 (30 秒內生效) | 無需手動操作 |
| **回滾** | Vercel Dashboard 一鍵返回上一版本 | 無需技術操作 |

**為什麼選擇 Vercel 靜態托管？**
- **零維護**：無需管理伺服器、無需更新系統、無需擔心安全補丁。
- **零成本**：完全免費，適合此類「純前端 + 跳轉」應用。
- **極速部署**：從代碼到上線只需 30 秒。
- **全球加速**：Vercel CDN 確保全球用戶快速載入。

### 1.3 PWA 安裝體驗

| 平台 | 安裝流程 | 注意事項 |
|------|----------|----------|
| **Android Chrome** | 瀏覽器提示「新增至主畫面」→ 一鍵安裝 | 自動提示，無需教學 |
| **iOS Safari** | 分享按鈕 → 「加入主畫面」→ 新增 | **需製作圖文教學**（iOS 12+） |
| **桌面瀏覽器** | 地址欄右側「安裝」圖示 | 可選，非主要使用場景 |

---

## 2. 功能架構 (Feature Matrix)

### 2.1 主頁介面 (Home Screen)

**設計原則**: 全螢幕大按鈕、高對比色、無多餘文字

```
┌─────────────────────────────┐
│                             │
│                             │
│     [  GO  ] (巨大綠色按鈕) │
│                             │
│                             │
│     [ HOME ] (巨大藍色按鈕) │
│                             │
│                             │
└─────────────────────────────┘
│ [主頁]  [設置] (底部僅兩鍵) │
└─────────────────────────────┘
```

### 2.2 Go 功能流程 (無縫跳轉)

```
1. 用戶點擊「GO」按鈕
   ↓
2. 彈出輸入視窗 (模態框)
   - 文字輸入框 (字體 24px, placeholder: "輸入目的地")
   - 用戶輸入地址 (或點擊輸入框使用系統鍵盤語音輸入)
   ↓
3. 用戶點擊「確認」
   ↓
4. App 內部執行:
   - 生成 Google Maps 深度連結 URL:
     `https://www.google.com/maps/dir/?api=1&origin=current&destination=DEST&travelmode=driving`
   - **立即執行 `window.open(url, '_blank')`**
   ↓
5. **系統自動喚起 Google Maps App** (若已安裝) 或打開瀏覽器
   ↓
6. Google Maps 直接顯示路線導航 (無需用戶二次確認)
```

**關鍵技術點**:
- **無需 API Key**: 深度連結是公開協議，Google 不收費。
- **無縫體驗**: 點擊 → 生成 URL → 喚起 App，全程 < 1 秒。
- **自動定位**: `origin=current` 讓 Google Maps 自動使用手機 GPS。

### 2.3 Home 功能流程 (無縫跳轉)

```
1. 用戶點擊「HOME」按鈕
   ↓
2. 顯示三個大按鈕 (垂直排列, 120x120px)
   - 🚗 **Drive** (開車回家)
   - 🚌 **Public Transport** (公共交通回家)
   - 🚶 **Walk** (步行回家)
   ↓
3. 用戶點擊任一按鈕 (例如 Drive)
   ↓
4. App 內部執行:
   - 讀取預設家庭地址 (LocalStorage)
   - 生成對應 URL (例如 `...&travelmode=driving`)
   - **立即執行 `window.open(url, '_blank')`**
   ↓
5. **系統自動喚起 Google Maps App**
   ↓
6. Google Maps 直接顯示「從当前位置回家」的路線
```

### 2.4 設置頁 (Settings)

**可設定項目**:

| 項目 | 選項 | 預設值 | 儲存方式 |
|------|------|--------|----------|
| 🏠 **家庭地址** | 文字輸入 | 空 (必填) | LocalStorage (瀏覽器本地) |
| 🎨 **主題顏色** | 高對比 / 標準 / 色盲 | 標準 | LocalStorage |
| 🔢 **字體大小** | 標準 / 特大 / 超大 | 特大 | LocalStorage |
| 🗑️ **清除數據** | 清除所有設置 | - | 需二次確認 |

**無後端設計**:
- 所有數據儲存在用戶瀏覽器的 `LocalStorage`。
- **無需資料庫**、**無需用戶登入**、**無需伺服器**。
- 數據僅在用戶手機上，隱私安全。

---

## 3. 核心技術實作 (深度連結)

### 3.1 深度連結生成邏輯 (JavaScript)

**核心函數** (無需 API Key):
```javascript
// lib/mapUtils.js

/**
 * 生成 Google Maps 深度連結並自動打開
 * @param {string} destination - 目的地地址 (例如 "中環星巴克")
 * @param {string} mode - 交通方式 ("driving", "transit", "walking")
 */
export function openGoogleMaps(destination, mode = 'driving') {
  const baseUrl = 'https://www.google.com/maps/dir/?api=1';
  const params = new URLSearchParams({
    origin: 'current', // 自動使用當前 GPS 位置
    destination: encodeURIComponent(destination),
    travelmode: mode
  });
  
  const url = `${baseUrl}&${params.toString()}`;
  
  // 立即打開，無彈窗確認
  window.open(url, '_blank');
}

// 使用範例
// 點擊 Drive 按鈕
document.getElementById('driveBtn').onclick = () => {
  const homeAddress = localStorage.getItem('homeAddress');
  if (homeAddress) {
    openGoogleMaps(homeAddress, 'driving');
  } else {
    alert('請先在設置頁設定家庭地址');
  }
};
```

### 3.2 為什麼不需要 Google Maps API Key?

| 功能 | 舊方案 (API) | **新方案 (深度連結)** |
|------|--------------|----------------------|
| **路線計算** | 呼叫 Directions API (收費) | **由 Google Maps App 內部計算 (免費)** |
| **地址驗證** | 呼叫 Places API (收費) | **用戶直接輸入，Google Maps 內部處理 (免費)** |
| **定位** | 呼叫 Geolocation API (可能收費) | **Google Maps 自動使用手機 GPS (免費)** |
| **成本** | $0.005 - $0.017 / 次 | **$0 / 次** |
| **複雜度** | 需申請 API Key、設置限額、監控帳單 | **無需任何配置，直接寫 URL** |

**結論**：此方案**完全免費**，且**功能不變**（用戶體驗完全相同）。

---

## 4. 部署流程 (Vercel 靜態托管)

### 4.1 準備工作
1. 建立 GitHub 倉庫 (例如 `go-home-app`)。
2. 將程式碼推送到 GitHub (`git push`)。

### 4.2 綁定 Vercel
1. 訪問 [Vercel Dashboard](https://vercel.com/dashboard)。
2. 點擊「Add New Project」→ 選擇 GitHub 倉庫。
3. Vercel 自動偵測 Next.js → 點擊「Deploy」。
4. **完成**：Vercel 生成網址 (例如 `https://go-home-app.vercel.app`)。

### 4.3 上線使用
- 用戶訪問網址 → 點擊「加入主畫面」→ 安裝為 App。
- 每次更新代碼 → `git push` → Vercel 自動部署 (30 秒內生效)。

### 4.4 成本明細

| 項目 | 費用 | 說明 |
|------|------|------|
| **Vercel 托管** | **$0/月** | 免費層 (無限流量、自動 HTTPS) |
| **GitHub 倉庫** | **$0/月** | 免費 (公開或私有) |
| **Google Maps** | **$0/月** | **深度連結無需 API Key** |
| **網域名稱** | **$0/年** | 使用 Vercel 免費網域 (可選自訂) |
| **總計** | **$0/月** | **完全免費** |

---

## 5. 開發里程碑 (Milestones)

### Phase 1: 基礎架構 (Day 1)
- [ ] 初始化 Next.js 專案
- [ ] 配置 Tailwind CSS + shadcn/ui
- [ ] 建立主頁 (GO / HOME 兩鍵)
- [ ] 實作 `openGoogleMaps()` 深度連結函數
- [ ] 測試跳轉邏輯 (Android/iOS)

### Phase 2: 核心功能 (Day 2)
- [ ] 實作「GO」功能 (輸入視窗 + 跳轉)
- [ ] 實作「HOME」功能 (三按鈕 + 跳轉)
- [ ] 實作設置頁 (家庭地址儲存至 LocalStorage)
- [ ] 測試完整流程 (點擊 → 跳轉 → 導航)

### Phase 3: PWA 優化 (Day 3)
- [ ] 配置 `next-pwa` (快取靜態資源)
- [ ] 測試 iOS/Android 安裝體驗
- [ ] 優化高對比模式 + 特大字體
- [ ] 測試離線模式 (僅顯示主頁，跳轉需網路)

### Phase 4: 上線部署 (Day 4)
- [ ] 推送到 GitHub
- [ ] 綁定 Vercel 並部署
- [ ] 生成 QR Code (方便長者掃描)
- [ ] 交付使用手冊 (圖文版)

---

## 6. 風險與對策

| 風險 | 嚴重性 | 對策 |
|------|--------|------|
| **iOS Safari 安裝複雜** | 🟡 中 | 製作圖文教學 (分享 → 加入主畫面) |
| **Google Maps 未安裝** | 🟢 低 | 自動 fallback 至瀏覽器版本 |
| **離線無法跳轉** | 🟢 低 | 顯示提示：「請檢查網路連線」 |
| **地址輸入錯誤** | 🟢 低 | Google Maps 內部處理 (用戶可手動修正) |
| **數據丟失 (清除快取)** | 🟢 低 | 提示用戶重新輸入家庭地址 |

**已消除風險** (無需再處理):
- ❌ Google API 成本超支 (已改用深度連結，$0 成本)。
- ❌ API Key 洩漏 (無需 API Key)。
- ❌ API 限額管理 (無需管理)。
- ❌ 伺服器維護 (無需伺服器)。

---

## 7. 測試清單 (用戶驗收標準)

### 7.1 功能測試
- [ ] 點擊「GO」→ 輸入地址 → 確認 → **自動跳轉 Google Maps** (無二次確認)。
- [ ] 點擊「HOME」→ 選擇「Drive」→ **自動跳轉 Google Maps 回家導航**。
- [ ] 設置頁輸入家庭地址 → 儲存 → 返回主頁 → 點擊「HOME」→ 地址正確。
- [ ] 切換交通方式 (Drive/Transit/Walk) → 跳轉後 Google Maps 顯示正確模式。

### 7.2 安裝測試
- [ ] Android: 訪問網址 → 提示「新增至主畫面」→ 安裝成功 → 桌面出現圖示。
- [ ] iOS: 訪問網址 → 點擊分享 → 「加入主畫面」→ 安裝成功 → 桌面出現圖示。
- [ ] 打開已安裝的 App → 直接進入主頁 (無瀏覽器網址列)。

### 7.3 長者體驗測試 (5 位長者)
- [ ] 能否在 30 秒內完成安裝？
- [ ] 能否在 10 秒內理解「GO」與「HOME」功能？
- [ ] 點擊後能否順利跳轉到 Google Maps？
- [ ] 整體滿意度是否 > 4/5？

---

## 8. 後續擴展方向 (Future Roadmap)

- 📍 **常去地點快捷鍵**: 預設「超市」「診所」「公園」按鈕 (跳轉邏輯相同，零成本)。
- 🆘 **緊急按鈕**: 一鍵撥打緊急聯絡人 (使用 `tel:` 協議，零成本)。
- 🌐 **多語言介面**: 粵語/普通話/英文切換 (僅文字替換，零成本)。
- 📊 **使用統計**: Vercel Analytics (免費) 查看用戶點擊次數。

---

**文件版本**: v2.2 (最終確認版)  
**最後更新**: 2026-04-10  
**開發負責人**: Zendo → 完成後由 I1_Coder 審查  
**審批狀態**: **待 Jacky 確認開發**  

---

## ✅ 開發啟動指令

**文件已更新為最終版 (v2.2)**，包含：
1. **Vercel 靜態托管** 完整部署流程。
2. **深度連結 (Deep Link)** 核心邏輯，**零 API 成本**。
3. **無縫跳轉** 體驗 (點擊 → 自動喚起 Google Maps)。
4. **總成本 $0/月** 明細。

**是否立即派遣 I1_Coder 開始開發？**
回覆「**確認**」或「**開始**」，我將啟動開發流程。
