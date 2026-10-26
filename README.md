# บทที่ ๑ การใช้งานโอเพนสแตค

เว็บเพจที่แปลงจากเอกสาร Word พร้อมใช้งานบน GitHub Pages

## โครงสร้างไฟล์

```
index.html        หน้าเว็บหลัก (เนื้อหาทั้งบท พร้อมสารบัญด้านข้าง)
assets/style.css  รูปแบบการแสดงผล (รองรับมือถือและโหมดมืด)
assets/script.js  ปุ่มคัดลอกคำสั่ง, สารบัญที่ไฮไลต์หัวข้อปัจจุบัน, ขยายรูปภาพ
images/           รูปภาพประกอบทั้งหมด
.nojekyll         ให้ GitHub Pages แสดงไฟล์ตามที่เป็นโดยไม่ผ่าน Jekyll
```

## วิธีเผยแพร่บน GitHub Pages

1. สร้าง repository ใหม่บน GitHub (หรือใช้ repository เดิม)
2. อัปโหลดไฟล์และโฟลเดอร์ทั้งหมดในโฟลเดอร์นี้ไปไว้ที่ root ของ repository
   (หรือในโฟลเดอร์ `docs/`)
3. ไปที่ **Settings → Pages** เลือก **Deploy from a branch**
   แล้วเลือก branch `main` และโฟลเดอร์ `/ (root)` (หรือ `/docs`)
4. รอประมาณ 1–2 นาที เว็บจะอยู่ที่ `https://<username>.github.io/<repository>/`
