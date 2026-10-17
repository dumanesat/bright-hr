import type { Reporter, TestCase, TestResult, TestStep } from '@playwright/test/reporter';

// Runs before other reporters so credential values cannot appear in action titles.
export default class CredentialRedactionReporter implements Reporter {
  private redact(text: string): string {
    for (const value of [process.env.BRIGHTHR_EMAIL, process.env.BRIGHTHR_PASSWORD]) {
      if (value) text = text.split(value).join('[REDACTED]');
    }
    return text;
  }

  onStepBegin(_test: TestCase, _result: TestResult, step: TestStep): void {
    step.title = this.redact(step.title);
  }

  onStepEnd(_test: TestCase, _result: TestResult, step: TestStep): void {
    if (step.error?.message) step.error.message = this.redact(step.error.message);
    if (step.error?.stack) step.error.stack = this.redact(step.error.stack);
  }

  onTestEnd(_test: TestCase, result: TestResult): void {
    for (const error of result.errors) {
      if (error.message) error.message = this.redact(error.message);
      if (error.stack) error.stack = this.redact(error.stack);
    }
  }
}
