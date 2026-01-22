# Bug Report - To-Do List Application

---

## Test Information

**Application:** https://abhigyank.github.io/To-Do-List/  
**Testing Date:** January 22, 2026  
**Tested By:** Rkira Helmer  
**Testing Framework:** Playwright + TypeScript

---

## Summary

พบ **2 bugs** จากการทดสอบ:

  **BUG-001**  Whitespace Validation  Priority: Medium  Severity: Low  Status: Open  
  **BUG-002**  Tab Filtering Not Working  Priority: High  Severity: Medium  Status: Open 

---


# BUG-001: Whitespace Validation

---

## Bug Details


  **Priority**   Medium 
  **Severity**   Low 
  **Status**   🔴 Open 
  **Reproducibility**  100% - เกิดทุกครั้ง 

---

## Description

ระบบยอมให้เพิ่ม task ที่เป็น whitespace ได้

---

## Steps to Reproduce

1. เปิดหน้า To-Do List
2. คลิกที่ช่อง input
3. กดปุ่ม **Space Bar** 3 ครั้ง (   )
4. คลิกปุ่ม **"Add"**
5. ไปที่แท็บ **"To-Do Tasks"**

---

## Expected Result

- ระบบควร **reject** และไม่เพิ่ม task
- แสดง error message
- พฤติกรรมควรเหมือนกับกรณีที่ใส่ empty string

---

## Actual Result

- ระบบ**เพิ่ม task ได้**
- มี list item ปรากฏใน To-Do tab
- แต่ไม่มี text แสดง
- มี checkbox และปุ่ม Delete

---

## Impact

- User สามารถสร้าง "blank tasks" ได้
- ทำให้ list ดูมั่ว

---

## Environment

  **Browser** Chromium 143.0.7499.4, Mozilla Firefox 144.0.2, WebKit 26.0 (Playwright bundled)
  **OS**  macOS Sonoma 14.5 
  **Screen**  Desktop & Mobile 

---

## Test Case Reference

**Test Case ID:** TC-TODO-006 (skipped due to this bug)

---

## Evidence

**Screenshot:** *(See test-results folder for screenshot)*

---


# BUG-002: Tab Filtering Not Working

---

## Bug Details

  **Priority**    High 
  **Severity**    Medium 
  **Status**      Open 
  **Reproducibility**  100% - เกิดทุกครั้ง 

---

## Description

แท็บ "To-Do Tasks" และ "Completed" ไม่ filter งานตาม status ที่แท้จริง - แสดงงาน**ทั้งหมด**เสมอ

---

## Steps to Reproduce

1. เปิดหน้า To-Do List
2. เพิ่มงาน 3 รายการ:
   - "งานที่ 1"
   - "งานที่ 2"
   - "งานที่ 3"
3. ไปที่แท็บ **"To-Do Tasks"** → เห็นงาน 3 รายการ ✓
4. **Tick checkbox** ที่งานแรก (งานที่ 1) เพื่อทำให้เสร็จ
5. ไปที่แท็บ **"Completed"**
6. สังเกตจำนวนงาน

---

## Expected Result

- **Completed tab:** ควรแสดงแค่ **1 งาน** (งานที่ 1 ที่เสร็จแล้ว)
- **To-Do tab:** ควรแสดงแค่ **2 งาน** (งานที่ 2 และ 3 ที่ยังไม่เสร็จ)

---

## Actual Result

- **Completed tab:** แสดง **3 งาน** (งานทั้งหมด)
- **To-Do tab:** แสดง **3 งาน** (งานทั้งหมด)
- **ทั้ง 2 tabs แสดงงานเหมือนกัน** - ไม่มี filtering เลย

---

## Root Cause Analysis

Tab switching ไม่ทำ filtering  สามารถแสดงงานทั้งหมดใน ทั้ง 2 tabs
---

## Impact

- **High impact on usability**
- User ไม่สามารถแยกดูงานที่เสร็จและยังไม่เสร็จได้
- การจัดการ tasks ทำได้ยาก
- หลัง complete งานแล้วยังเห็นใน To-Do tab
- Core feature ของ To-Do app ใช้ไม่ได้

---

## Environment

  **Browser** Chromium 143.0.7499.4, Mozilla Firefox 144.0.2, WebKit 26.0 (Playwright bundled)
  **OS**  macOS Sonoma 14.5 
  **Screen**  Desktop & Mobile 

---

## Test Case Reference

**Test Case ID:** TC-TODO-013 (validates current buggy behavior with TODO comments for fix)

---

## Evidence

**Video Evidence:** *(See test-results folder for video recording)*

---

# Testing Notes

---

## Test Coverage

- ✅ 16 automated test cases written
- ✅ All scenarios covered (Happy, Negative, Edge)
- ✅ Tests ready to validate fixes when deployed

---

## Regression Testing

เมื่อ bugs ถูกแก้แล้ว:

1. Un-skip TC-TODO-006
2. Update TC-TODO-013 expected values
3. Re-run full test suite
4. Verify no new regressions

---


# Additional Notes

---

## Testing Methodology

- Automated testing with Playwright
- Manual exploratory testing
- Cross-browser testing
- Mobile responsive testing

---

## Tools Used

- Playwright 1.57.0
- Chrome DevTools

---

## Test Results Location

- **Test code:** `/tests/todo.spec.ts`
- **Screenshots:** `/test-results/`
- **Videos:** `/test-results/`
- **HTML Report:** `/playwright-report/`

---
## Report Information

**Report Prepared By:** Rkira Helmer - QA Engineer  
**Date:** January 22, 2026

---