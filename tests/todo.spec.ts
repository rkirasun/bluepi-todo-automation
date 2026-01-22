import { test, expect } from '@playwright/test';
import { TodoPage } from '../pages/TodoPage';


test.describe('To-Do List - Complete Test Suite', () => {
  let todoPage: TodoPage;

  // ก่อนเริ่มแต่ละ test ให้เปิดหน้าใหม่
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  // FUNCTIONALITY TESTS

  test('TC-TODO-001: เพิ่มงานใหม่และตรวจสอบว่าปรากฏในหน้า To-Do', async () => {
    const taskName = 'ซื้อของที่ตลาด';
    
    // เพิ่มงาน
    await todoPage.addTask(taskName);
    
    // ไปที่แท็บ To-Do
    await todoPage.goToTodoTab();
    
    // ต้องเห็นงานในรายการ
    await todoPage.verifyTaskInTodo(taskName);
    
    // จำนวน task ต้องเป็น 1
    await todoPage.verifyTaskCount(1);
  });

  test('TC-TODO-002: เพิ่มงาน -> ทำให้เสร็จ -> ตรวจสอบในหน้า Completed', async () => {
    const taskName = 'ซื้อกับข้าว';
    
    // เพิ่มงาน
    await todoPage.addTask(taskName);
    
    // ไปที่ To-Do และเช็คว่ามี task
    await todoPage.goToTodoTab();
    await todoPage.verifyTaskInTodo(taskName);
    
    // ทำให้เสร็จ
    await todoPage.completeTask(taskName);
    
    // ไปที่ Completed และเช็คว่ามีไอคอน done
    await todoPage.goToCompletedTab();
    await todoPage.verifyCompletedTask(taskName);
  });

  test('TC-TODO-003: ลบงานจากหน้า To-Do', async () => {
    const taskName = 'งานที่เกียมโดนลบ';
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    // ลบงาน
    await todoPage.deleteTask(taskName);
    
    // verify ต้องไม่เห็นงาน
    await todoPage.verifyTaskDeleted(taskName);
    
    // จำนวน task ต้องเป็น 0
    await todoPage.verifyTaskCount(0);
  });

  test('TC-TODO-004: ลบงานจากหน้า Completed', async () => {
    const taskName = 'งานเสร็จแล้วค่อยลบ';
    
    // เพิ่มงานและทำให้เสร็จ
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    await todoPage.completeTask(taskName);
    
    // ไปที่ Completed แล้วลบ
    await todoPage.goToCompletedTab();
    await todoPage.deleteTask(taskName);
    
    // ต้องไม่เห็นงาน
    await todoPage.verifyTaskDeleted(taskName);
    await todoPage.verifyTaskCount(0);
  });

  // NEGATIVE TEST CASES

  test('TC-TODO-005: [Negative] เพิ่มค่าว่าง (Empty String) - ระบบต้องไม่เพิ่มรายการ', async () => {
    // ใส่ค่าว่าง
    await todoPage.addTask('');
    
    // ไปที่ To-Do
    await todoPage.goToTodoTab();
    
    // จำนวนต้องเป็น 0 (ระบบไม่ยอมให้เพิ่ม)
    await todoPage.verifyTaskCount(0);
  });

  test('TC-TODO-006: [BUG] เพิ่ม Whitespace - ระบบยอมให้เพิ่ม (ควร reject)', async () => {
    // BUG: ระบบยอมให้เพิ่ม whitespace (ควร reject)
    // TODO: เปลี่ยนเป็น verifyTaskCount(0) เมื่อแก้แล้ว
    
    await todoPage.addTask('   '); // space bar 3 ครั้ง
    await todoPage.goToTodoTab();
    
    // Current bug behavior
    await todoPage.verifyTaskCount(1);
    
    // TODO: เมื่อ bug แก้แล้ว เปลี่ยนเป็น:
    // await todoPage.verifyTaskCount(0);
  });

  // EDGE CASES & DATA VALIDATION

  test('TC-TODO-007: [Edge Case] เพิ่มงานซ้ำกัน - ระบบยอมให้เพิ่ม', async () => {
    const taskName = 'งานซ้ำ';
    
    // เพิ่ม 2 ครั้ง
    await todoPage.addTask(taskName);
    await todoPage.addTask(taskName);
    
    await todoPage.goToTodoTab();
    
    // ต้องมี 2 รายการ (ระบบยอมให้ซ้ำได้)
    await todoPage.verifyTaskCount(2);
  });

  test('TC-TODO-008: [Data] เพิ่มงานภาษาไทย', async () => {
    const taskName = 'ทำการบ้านส่งอาจาร์ย';
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    // ต้องเห็นข้อความ
    await todoPage.verifyTaskText(taskName);
    await todoPage.verifyTaskInTodo(taskName);
  });

  test('TC-TODO-009: [Data] เพิ่มงานที่มี Emoji', async () => {
    const taskName = 'ซื้อของ 🛒 ทำอาหาร 🍳 อ่านหนังสือ 📚';
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    // ต้องแสดง Emoji ได้ถูกต้อง
    await todoPage.verifyTaskText(taskName);
  });

  test('TC-TODO-010: [Data] เพิ่มงานที่มี Special Characters', async () => {
    const taskName = 'Task @#$_%!~``+';
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    // ต้องแสดง special characters ได้ถูกต้อง
    await todoPage.verifyTaskText(taskName);
  });

  test('TC-TODO-011: [Edge Case] เพิ่มงานที่มีชื่อยาวมาก (200+ characters)', async () => {
    const taskName = 'A'.repeat(200); // ตัวอักษร A จำนวน 200 ตัว
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    // ระบบต้องรองรับ text ยาว
    await todoPage.verifyTaskCount(1);
    await todoPage.verifyTaskInTodo(taskName);
  });

  test('TC-TODO-012: [Data] เพิ่มงานที่มีตัวเลข', async () => {
    const taskName = 'โทรกลับ bluepi เบอร์ 02-123-4567 ตอน 14:00 น.';
    
    await todoPage.addTask(taskName);
    await todoPage.goToTodoTab();
    
    await todoPage.verifyTaskText(taskName);
  });

  // MULTIPLE TASKS MANAGEMENT

  // TODO: Completed tab ไม่ filter งานถูกต้อง (See BUG_REPORT.md)
  test('TC-TODO-013: [BUG] Completed tab แสดงงานทั้งหมด (ไม่ filter)', async () => {
    const tasks = ['งานที่ 1', 'งานที่ 2', 'งานที่ 3'];
    // เพิ่ม 3 งาน
    for (const task of tasks) {
      await todoPage.addTask(task);
    }
    
    await todoPage.goToTodoTab();
    await todoPage.verifyTaskCount(3);
    
    // ทำงานแรกให้เสร็จ
    await todoPage.completeTask(tasks[0]);
    
    // BUG: Completed tab แสดงงานทั้งหมด (ไม่ใช่แค่ที่เสร็จ)
    await todoPage.goToCompletedTab();
    await todoPage.verifyTaskCount(3); //Current behavior (bug)
    
    // TODO: เมื่อ bug แก้แล้ว เปลี่ยนเป็น:
    // await todoPage.verifyTaskCount(1);
    // await todoPage.verifyCompletedTask(tasks[0]);
  });

  test('TC-TODO-014: [Multiple] เพิ่ม 5 งาน ลบ 2 งาน เหลือ 3 งาน', async () => {
    const tasks = ['Task 1', 'Task 2', 'Task 3', 'Task 4', 'Task 5'];
    
    // เพิ่ม 5 งาน
    for (const task of tasks) {
      await todoPage.addTask(task);
    }
    
    await todoPage.goToTodoTab();
    await todoPage.verifyTaskCount(5);
    
    // ลบ 2 งานแรก
    await todoPage.deleteTask(tasks[0]);
    await todoPage.deleteTask(tasks[1]);
    
    // ต้องเหลือ 3 งาน
    await todoPage.verifyTaskCount(3);
    
    // เช็คว่า 3 งานที่เหลืออยู่ถูกต้อง
    await todoPage.verifyTaskInTodo(tasks[2]);
    await todoPage.verifyTaskInTodo(tasks[3]);
    await todoPage.verifyTaskInTodo(tasks[4]);
  });

  test('TC-TODO-015: [UI] Input field ต้องว่างเปล่าหลังเพิ่มงาน', async () => {
    const taskName = 'ทดสอบ input field';
    
    await todoPage.addTask(taskName);
    
    // Input field ต้องว่างเปล่า (เคลียร์อัตโนมัติ)
    await todoPage.verifyInputEmpty();
  });
});

// ADDITIONAL TEST SUITE: PERFORMANCE

test.describe('To-Do List - Performance Tests', () => {
  let todoPage: TodoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('TC-PERF-001: เพิ่มงาน 50 รายการ - ระบบต้องรองรับได้', async () => {
    // เพิ่ม 50 งาน
    for (let i = 1; i <= 50; i++) {
      await todoPage.addTask(`Task ${i}`);
    }
    
    await todoPage.goToTodoTab();
    
    // ต้องมีครบ 50 งาน
    await todoPage.verifyTaskCount(50);
  });
});