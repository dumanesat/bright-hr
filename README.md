# Playwright Automation Template

This repository contains a robust and scalable test automation framework built with [Playwright](https://playwright.dev/). It supports **API**, **UI**, and **Hybrid** (simultaneous API & UI) testing using TypeScript.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Visual Studio Code](https://code.visualstudio.com/) (Recommended)
- Playwright Extension for VS Code

### Installation

1.  Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Install Playwright browsers:
    ```bash
    npx playwright install
    ```

### Environment Setup

Create a `.env` file in the root directory to manage your configuration. These variables are automatically loaded by the utility files.

```ini
# UI Configuration
URL=https://example.com

# API Configuration
API_BASE_URL=https://api.example.com
API_AUTH_TOKEN=your_bearer_token_here
API_HTTP_USERNAME=your_username
API_HTTP_PASSWORD=your_password
```

---

## 📂 Project Structure

```
├── pages/                  # Page Object Model (POM) classes
│   ├── BasePage.ts         # Base class for all pages
│   └── HomePage.ts         # Example page object
├── tests/                  # Test specifications
│   ├── api-test-example.spec.ts
│   ├── ui-test-example.spec.ts
│   └── hybrid-test-example.spec.ts
├── utilities/              # Custom test fixtures
│   ├── APITestUtils.ts     # API-specific fixture
│   ├── UITestUtils.ts      # UI-specific fixture
│   └── HybridTestUtils.ts  # Combined API & UI fixture
├── .env                    # Environment variables (not committed)
└── playwright.config.ts    # Main Playwright configuration
```

---

## 🧪 Test Templates & Usage

### 1. API Testing

Use the `apiContext` fixture to perform HTTP requests. Authentication and headers are handled automatically.

- **Template File:** `tests/api-test-example.spec.ts`
- **Fixture:** `utilities/APITestUtils.ts`

**Example:**

```typescript
import { test, expect } from "../utilities/APITestUtils";

test("GET Request Example", async ({ apiContext }) => {
  const response = await apiContext.get("/users");
  expect(response.status()).toBe(200);
});
```

### 2. UI Testing

Use the `page` fixture which is pre-configured to navigate to your base URL and wait for the network to be idle. Usage of Page Object Model is encouraged.

- **Template File:** `tests/ui-test-example.spec.ts`
- **Fixture:** `utilities/UITestUtils.ts`

**Example:**

```typescript
import { test, expect } from "../utilities/UITestUtils";
import { HomePage } from "../pages/HomePage";

test("Login Example", async ({ page }) => {
  // Page is already at process.env.URL
  const homePage = new HomePage(page);
  await homePage.enterSearchBox("Playwright");
  await expect(page).toHaveTitle(/Search/);
});
```

### 3. Hybrid Testing

Use the `apiContext` and `page` fixtures simultaneously. Ideal for setting up data via API before verifying it on the UI.

- **Template File:** `tests/hybrid-test-example.spec.ts`
- **Fixture:** `utilities/HybridTestUtils.ts`

**Example:**

```typescript
import { test, expect } from "../utilities/HybridTestUtils";

test("Create User via API and Verify on UI", async ({ apiContext, page }) => {
  // 1. API Step: Create data
  const response = await apiContext.post("/users", {
    data: { name: "TestUser" },
  });
  expect(response.ok()).toBeTruthy();

  // 2. UI Step: Verify data
  await page.reload();
  await expect(page.getByText("TestUser")).toBeVisible();
});
```

---

## 🏃 Running Tests

**Run all tests:**

```bash
npx playwright test
```

**Run a specific test file:**

```bash
npx playwright test tests/api-test-example.spec.ts
```

**Run in UI Mode (Interactive):**

```bash
npx playwright test --ui
```

**Run with specific tag:**

```bash
npx playwright test --grep "@smoke"
```

---

## Framework practices

1.  **Use Page Objects:** Keep locators and actions in `pages/` to make tests readable and maintainable.
2.  **Environment Variables:** Never hardcode credentials or URLs. Use `.env`.
3.  **Use Templates:** Duplicate the example files in `tests/` to start new test suites quickly.
4.  **Wait for Elements:** Playwright auto-waits, but if needed, use assertions like `toBeVisible()` instead of hard sleeps.


## Allure Report (Türkçe)

Allure 2 klasik dashboard'u için Java 11+ gerekir (`java -version`). CI Java 17 kullanır.
Mevcut Playwright HTML raporu ve tarayıcı ayarları korunur.

```bash
npm ci
npm run test:employee
npm run allure:generate
npm run allure:open
```

Test başarısız olsa da son iki komutu çalıştırın. `allure-results/` ham JSON ve ekleri,
`allure-report/` ise grafikler, Suites, Behaviors ve Timeline içeren HTML dashboard'u tutar.
HTML'yi dosya olarak çift tıklamak yerine `allure:open` ile açın.
Standart Playwright raporu: `npm run report:redact` ardından `npm run report`.

Mevcut `test.step()` adımları Allure'a aktarılır. Employee Management suite, feature,
critical severity ve açıklama eklenmiştir. Başarısız denemelerde mevcut Playwright
ayarlarına göre screenshot, video ve trace eklenir; başarılı denemede bulunmamaları normaldir.
Trace ZIP dosyası indirildikten sonra `npx playwright show-trace <dosya.zip>` ile açılır.

`test:employee` önce eski ham sonuçları temizler; HTML raporundaki history saklanır.
`allure:generate` önce önceki HTML raporunun `history/` dizinini sonuçlara kopyalar.
CI'da bu history main branch koşumları arasında Actions cache'inde saklanır; cache
silinirse veya zaman aşımına uğrarsa trend yeniden başlar. İlk koşumda trend yoktur.
Rapor üretimi test exit code'unu değiştirmez; CI'da başarısız test başarısız kalır.

CI her sonuçtan sonra credential redaction çalıştırır, Allure HTML'yi üretir ve
`allure-report` artifact'ini yükler. ZIP'i indirin, açın ve proje klasöründen
`npx allure open /rapor/klasorunun/yolu` çalıştırın. Allure için Pages gerekmez;
mevcut Pages job'u standart Playwright raporunu yayınlamaya devam eder.

Giriş alanları videoda ve screenshot'ta maskelenir. Otomatik Playwright API adımları
Allure'da kapalıdır; yalnızca anlamlı test adımları gösterilir. Reporter adımlarındaki
credential değerleri maskelenir. Rapor üretiminden önce JSON, HTML ve trace ZIP'leri
BRIGHTHR_EMAIL/BRIGHTHR_PASSWORD değerlerinden temizlenir. Secret'ları metadata veya
console log'a eklemeyin. Raporlarda uygulama verisi ve session bilgileri bulunabileceği
 için artifact erişimini güvenilir kişilerle sınırlayın.
