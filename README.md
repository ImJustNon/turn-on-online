## Turn On Online
This is my first project using Wemos D1 R1 (C++) To connect to rest api (Javascript)


- โปรเจคนี้ผมได้ Relay เชื่อมต่อกับ สาย Power Switch เเละต่อ Relay เข้ากับ Wemos D1 R1(C++) เพื่อควบคุมการทำงานของ Relay เเละ ให้ Wemos D1 R1 ค่อยส่ง Request(http://127.0.0.1:8080/api/check) ไปที่ API(JavaScript) 
- บน API จะคอยรอรับ Request จาก (http://127.0.0.1:8080/api/turn/on หรือ http://127.0.0.1:8080/api/turn/off) เพื่อเป็นการบอกว่า ให้อัปเดตสถานะใน SQLite(SQL) ให้เป็นไปตาม Request (หาก on อัปเดตเป็น 1 ถ้า off อัปเดตเป็น 0)
- หาก API เป้น ON อยู่ API จะคอยเช็คตัวเองว่าหากเป้น On ให้นับถอยหลัง 5 วินาที จากนั้น ให้เปลี่ยนเป็น Off
- ในขณะที่ Wemos D1 R1 ได้ส่ง Request ไป API ก็จะดึงข้อมูลบันทึกจาก SQLite หาก Response มี Status เป็น 404 จะไม่ทำงานเเต่อย่าใด เเต่หากมี Status เป็น 200 จะสั่งให้ Relay ทำงาน


<h1>♻ LOL ♻</h1>
