import { expect, Locator, Page } from '@playwright/test';

/**
 * Page Object Model for To-Do List
 * https://abhigyank.github.io/To-Do-List/
 */

export class TodoPage {
  readonly page: Page;
  readonly taskInput: Locator;
  readonly addButton: Locator;
  readonly todoTab: Locator;
  readonly completedTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.taskInput = page.locator('#new-task');
    this.addButton = page.getByRole('button', { name: 'add' });
    this.todoTab = page.getByRole('link', { name: 'To-Do Tasks' });
    this.completedTab = page.getByRole('link', { name: 'Completed' });
  }

  // Navigate to tabs
  async goto() {
    await this.page.goto('https://abhigyank.github.io/To-Do-List/');
    await this.page.waitForLoadState('domcontentloaded');
  }

  async goToTodoTab() {
    await this.todoTab.click();
    await this.page.waitForTimeout(300);
  }

  async goToCompletedTab() {
    await this.completedTab.click();
    await this.page.waitForTimeout(300);
  }

  // Actions
  
  async addTask(taskName: string) {
    await this.taskInput.fill(taskName);
    await this.addButton.click();
    // รอให้ task ถูกเพิ่มเข้า
    if (taskName.trim()) {
      await this.page.waitForSelector(`li:has-text("${taskName}")`, { 
        timeout: 3000,
        state: 'attached' 
      });
    }
  }

  async completeTask(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await taskRow.getByRole('checkbox').click();
    const doneIcon = taskRow.locator('i.material-icons').filter({ hasText: 'done' });
    await expect(doneIcon).toBeVisible({ timeout: 3000 });
  }

  async deleteTask(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await taskRow.getByRole('button', { name: 'Delete' }).click();
    await expect(taskRow).toBeHidden({ timeout: 3000 });
  }

  // Verifications 

  async verifyTaskInTodo(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await expect(taskRow).toBeVisible({ timeout: 3000 });

    // ต้องไม่เห็นไอคอน "done" (เพราะว่ายังไม่เสร็จ)
    const doneIcon = taskRow.locator('i.material-icons').filter({ hasText: 'done' });
    await expect(doneIcon).toBeHidden();
  }

  async verifyCompletedTask(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await expect(taskRow).toBeVisible({ timeout: 3000 });

    // ต้องเห็นไอคอนติ๊กถูก
    const doneIcon = taskRow.locator('i.material-icons').filter({ hasText: 'done' });
    await expect(doneIcon).toBeVisible({ timeout: 3000 });
  }

  async verifyTaskDeleted(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await expect(taskRow).toBeHidden({ timeout: 3000 });
  }


  async verifyTaskCount(expectedCount: number) {
    // ถ้าคาดหวัง 0 ให้รอว่า list ว่างเปล่า
    if (expectedCount === 0) {
      await this.page.waitForSelector('li', { 
        state: 'hidden',
        timeout: 3000 
      }).catch(() => {
      });
    } else {
      // รอให้มี elements ตามจำนวนที่คาดหวังไว้
      await this.page.waitForSelector('li', { 
        state: 'visible',
        timeout: 3000 
      });
    }
    const count = await this.page.locator('li').count();
    expect(count).toBe(expectedCount);
  }

  async verifyInputEmpty() {
    await expect(this.taskInput).toBeEmpty();
  }

  async verifyTaskText(taskName: string) {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    await expect(taskRow).toContainText(taskName);
  }

  // HELPER METHODS

  async getTaskCount(): Promise<number> {
    return await this.page.locator('li').count();
  }

  async isTaskExists(taskName: string): Promise<boolean> {
    const taskRow = this.page.locator('li').filter({ hasText: taskName });
    return await taskRow.isVisible();
  }

  async clearInput() {
    await this.taskInput.clear();
  }
}