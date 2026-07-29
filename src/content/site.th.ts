/**
 * Thai translation of every word on the site. Structural data (photos,
 * prices, ids, contact links) is identical to site.ts and simply repeated
 * here — only the copy differs.
 *
 * Typed against `Site` (site.ts) so TypeScript flags any field that's
 * missing, misspelled, or shaped differently from the English version.
 */

import type { Site } from "./site";

export const site: Site = {
  trainer: {
    name: "Mui Wong",
    role: "เทรนเนอร์ส่วนตัว",
    location: "กรุงเทพฯ ประเทศไทย",
    logo: "/logo-mark.png",
  },

  contacts: {
    whatsappNumber: "66945953441",
    whatsappDisplay: "+66 94 595 3441",
    telHref: "tel:+66945953441",
    instagram: "@muimui__wong",
    instagramUrl: "https://instagram.com/muimui__wong",
    line: "@muimui_wong",
    lineUrl: "https://line.me/ti/p/@muimui_wong",
    qr: "/QR_Mui.jpg",
  },

  nav: {
    items: [
      { label: "เกี่ยวกับฉัน", href: "#about" },
      { label: "ทำไมต้องฉัน", href: "#benefits" },
      { label: "สิ่งที่ได้รับ", href: "#included" },
      { label: "ราคา", href: "#pricing" },
      { label: "ติดต่อ", href: "#contact" },
    ],
    cta: "จองเลย",
  },

  hero: {
    eyebrow: "เทรนเนอร์ส่วนตัว · กรุงเทพฯ",
    line1: "เทรนส่วนตัว",
    line2: "ที่ได้ผลจริง",
    script: "แบบยั่งยืน",
    lede: "ช่วยลดน้ำหนัก 5–10 กก. ภายใน 3 เดือน — ไม่ต้องอดอาหารโหด ไม่ต้องออกกำลังกายจนหมดแรง",
    primaryCta: "จองปรึกษาฟรี",
    secondaryCta: "ดูราคา",
    photo: "/Mui.jpg",
    photoAlt: "Mui Wong กำลังฝึกยกน้ำหนักในยิม",
    badge: { value: "ฟรี", label: "ปรึกษาครั้งแรก" },
    stats: [
      { value: "7+", label: "ปีประสบการณ์" },
      { value: "150+", label: "ลูกค้าที่ดูแล" },
      { value: "3000+", label: "เซสชันที่ผ่านมา" },
    ],
  },

  about: {
    eyebrow: "เกี่ยวกับฉัน",
    title: "รู้จัก Mui",
    quote:
      "ช่วยลดน้ำหนัก 5–10 กก. ภายใน 3 เดือน — ไม่ต้องอดอาหารโหด ไม่ต้องออกกำลังกายจนหมดแรง",
    body: "แนวทางของฉันอิงหลักวิทยาศาสตร์การกีฬาและประสบการณ์ตรงหลายปี ลูกค้าทุกคนจะได้แผนที่ออกแบบเฉพาะตามไลฟ์สไตล์ เป้าหมาย และสภาพร่างกายปัจจุบัน — ไม่ใช่แผนสำเร็จรูป",
    credentials: [
      "เทรนเนอร์ที่ได้รับการรับรอง FIT",
      "ประสบการณ์เทรนส่วนตัว 7 ปี",
      "เชี่ยวชาญด้านลดน้ำหนักและฟิตเนสเชิงฟังก์ชัน",
      "รับลูกค้าอายุ 16–65 ปี",
      "ฝึกได้ทั้งออนไลน์และตัวต่อตัว",
    ],
    cta: "ดูโปรแกรมทั้งหมด",
    photo: "/Mui_2.jpg",
    photoAlt: "Mui Wong ในยิม",
    badge: { value: "7", label: "ปี\nประสบการณ์" },
  },

  benefits: {
    eyebrow: "ทำไมต้องมีโค้ช",
    title: "ข้อดีของ\nการเทรนส่วนตัว",
    prevLabel: "ข้อก่อนหน้า",
    nextLabel: "ข้อถัดไป",
    items: [
      {
        no: "01",
        title: "แผนที่ออกแบบเพื่อร่างกายคุณ",
        text: "โปรแกรมของคุณถูกเขียนขึ้นตามเป้าหมาย ตารางเวลา และระดับความฟิตปัจจุบัน — แล้วปรับใหม่เรื่อย ๆ ตามความก้าวหน้า",
        photo: "/benefits/benefit-01.webp",
        photoAlt: "ท่าสควอทลึกพร้อมถือเคทเทิลเบลล์แนบอก",
      },
      {
        no: "02",
        title: "แก้ท่าผิดได้ทันที",
        text: "ท่าที่ผิดจะถูกแก้ไขทันทีในเวลาจริง ก่อนที่จะกลายเป็นอาการบาดเจ็บเรื้อรังที่ทำให้คุณเสียเวลาไปหลายเดือน",
        photo: "/benefits/benefit-02.webp",
        photoAlt: "ท่าแพลงก์ศอกพร้อมหลังตรง",
      },
      {
        no: "03",
        title: "ความรับผิดชอบที่ยึดโยงคุณไว้",
        text: "มีคนรอคุณอยู่ แค่นี้ก็เป็นความต่างระหว่างเทรนแค่เดือนเดียวกับเทรนต่อเนื่องทั้งปี",
        photo: "/benefits/benefit-03.webp",
        photoAlt: "ท่าลันจ์ก้าวหน้าพร้อมดัมเบลสองมือ",
      },
      {
        no: "04",
        title: "โภชนาการที่เข้ากับชีวิตคุณ",
        text: "ไม่มีลิสต์ห้ามกินสุดโหด แต่เป็นวิธีกินที่คุณรักษาไว้ได้แม้โปรแกรมจะจบไปแล้ว",
        photo: "/benefits/benefit-04.webp",
        photoAlt: "ท่ายืดลำตัวด้านข้างเหนือศีรษะ",
      },
      {
        no: "05",
        title: "ความก้าวหน้าที่วัดผลได้",
        text: "องค์ประกอบร่างกาย ตัวเลขความแข็งแรง และการเช็กอินรายสัปดาห์ — เพื่อให้คุณรู้ว่ามันได้ผลจริง ไม่ใช่แค่หวังว่าจะได้ผล",
        photo: "/benefits/benefit-05.webp",
        photoAlt: "ท่ายืดพร้อมดันดัมเบลสองมือเหนือศีรษะ",
      },
      {
        no: "06",
        title: "โปรแกรมที่โตไปพร้อมคุณ",
        text: "โปรแกรมปรับไปพร้อมกับคุณ สิ่งที่ได้ผลในสัปดาห์แรกอาจไม่ใช่สิ่งที่คุณต้องการในสัปดาห์ที่สิบสอง",
        photo: "/benefits/benefit-06.webp",
        photoAlt: "ท่านั่งทรงเรือ ยกขาและแขนเหยียดตรง",
      },
    ],
  },

  whyTrain: {
    title: "ทำไมต้องเทรน?",
    prevLabel: "เหตุผลก่อนหน้า",
    nextLabel: "เหตุผลถัดไป",
    items: [
      {
        caption: "ร่างกายที่กลับมาเคลื่อนไหวคล่องอีกครั้ง",
        photo: "/why/why-01.webp",
        photoAlt: "ท่ายืดตัวด้านหน้าแบบนั่งบนเสื่อโยคะ",
      },
      {
        caption: "หลับลึกขึ้น เครียดน้อยลง",
        photo: "/why/why-02.webp",
        photoAlt: "พักผ่อนบนเสื่อหลังจบเซสชันเทรน",
      },
      {
        caption: "ความมั่นใจในตัวเอง",
        photo: "/why/why-03.webp",
        photoAlt: "ยืนตัวตรงด้วยท่าทางผ่อนคลาย",
      },
      {
        caption: "ความแข็งแรงและความยืดหยุ่นที่ยั่งยืน",
        photo: "/why/why-04.webp",
        photoAlt: "ท่าลันจ์ต่ำพร้อมยืดแขนเหนือศีรษะ",
      },
      {
        caption: "พลังงานที่พอสำหรับทั้งวัน",
        photo: "/why/why-05.webp",
        photoAlt: "ท่ายืนยืดตัวด้านข้างเหนือศีรษะ",
      },
    ],
  },

  included: {
    eyebrow: "สิ่งที่คุณจะได้รับ",
    title: "โปรแกรมนี้มีอะไรบ้าง",
    lede: "ทุกโปรแกรม ไม่ว่าจะเทรนในยิมหรือทางออนไลน์ จะได้รับสิ่งเหล่านี้ทั้งหมด",
    items: [
      {
        no: "01",
        title: "วิเคราะห์องค์ประกอบร่างกาย",
        photo: "/included/included-01.webp",
        photoAlt: "ท่ายืนประเมินร่างกาย มือเท้าสะเอว",
      },
      {
        no: "02",
        title: "โปรแกรมเทรนเฉพาะบุคคล",
        photo: "/included/included-02.webp",
        photoAlt: "เทรนด้วยยางยืดออกกำลังกาย",
      },
      {
        no: "03",
        title: "แผนโภชนาการส่วนตัว",
        photo: "/included/included-03.webp",
        photoAlt: "ถือขวดเชคเกอร์",
      },
      {
        no: "04",
        title: "ไดอารีโภชนาการและรีวิว",
        photo: "/included/included-04.webp",
        photoAlt: "นั่งไขว่ห้างเขียนสมุดบันทึก",
      },
      {
        no: "05",
        title: "แนะนำเทคนิคการเล่นท่า",
        photo: "/included/included-05.webp",
        photoAlt: "สาธิตท่าสควอทด้วยฟอร์มที่ถูกต้อง",
      },
      {
        no: "06",
        title: "เช็กอินความก้าวหน้ารายสัปดาห์",
        photo: "/included/included-06.webp",
        photoAlt: "เกร็งกล้ามแขน ฉลองความก้าวหน้า",
      },
      {
        no: "07",
        title: "แชทซัพพอร์ตระหว่างเซสชัน",
        photo: "/included/included-07.webp",
        photoAlt: "พิมพ์ข้อความในโทรศัพท์",
      },
      {
        no: "08",
        title: "ปรับโปรแกรมตามความก้าวหน้า",
        photo: "/included/included-08.webp",
        photoAlt: "ท่ากระโดดแบบ jumping jack เต็มพลัง",
      },
    ],
    prevLabel: "ข้อก่อนหน้า",
    nextLabel: "ข้อถัดไป",
    note: "ปรึกษาครั้งแรกฟรี — เราจะคุยกันถึงเป้าหมายของคุณและวางแผนร่วมกัน",
    noteCta: "รับคำปรึกษาฟรี",
  },

  pricing: {
    eyebrow: "ราคา",
    title: "เลือก",
    titleScript: "โปรแกรมของคุณ",
    lede: "3 รูปแบบการทำงานร่วมกัน ทุกแบบเริ่มต้นด้วยการปรึกษาฟรี",
    popularLabel: "ยอดนิยม",
    cta: "จองแพ็กเกจนี้",
    footnote:
      "ราคาต่อเดือน ไม่แน่ใจว่าแบบไหนเหมาะกับคุณ? ทักมาคุยกันได้เลย บทสนทนาแรกไม่มีค่าใช้จ่าย",
    plans: [
      {
        id: "online",
        name: "โค้ชชิ่งออนไลน์",
        tagline: "ทางไกล",
        price: "฿2,600",
        period: "/ เดือน",
        summary:
          "โค้ชชิ่งออนไลน์เต็มรูปแบบ — เทรน โภชนาการ และซัพพอร์ต ไม่ว่าคุณจะอยู่ที่ไหน ไม่ต้องเข้ายิม",
        features: [
          "โปรแกรมวิดีโอ",
          "แผนเทรนรายสัปดาห์",
          "คำแนะนำด้านโภชนาการ",
          "แชทซัพพอร์ต",
          "ไม่ต้องเข้ายิม",
        ],
        popular: false,
      },
      {
        id: "weight-loss",
        name: "ลดน้ำหนัก",
        tagline: "เผาผลาญไขมัน",
        price: "฿3,600",
        period: "/ เดือน",
        summary:
          "ลดน้ำหนัก 5–10 กก. ภายใน 3 เดือน ด้วยแผนเทรนและโภชนาการเฉพาะบุคคล",
        features: [
          "วิเคราะห์องค์ประกอบร่างกาย",
          "3 เซสชัน / สัปดาห์",
          "แผนโภชนาการส่วนตัว",
          "ไดอารีโภชนาการ",
          "เช็กอินรายสัปดาห์",
        ],
        popular: true,
      },
      {
        id: "muscle-gain",
        name: "เพิ่มกล้ามเนื้อ",
        tagline: "ไฮเปอร์โทรฟี",
        price: "฿3,600",
        period: "/ เดือน",
        summary:
          "โปรแกรมเทรนความแข็งแรงและโภชนาการเพื่อสร้างกล้ามเนื้อคุณภาพ",
        features: [
          "โปรแกรมสปลิต",
          "4 เซสชัน / สัปดาห์",
          "แผนโภชนาการ",
          "ติดตามความก้าวหน้า",
          "แนะนำเทคนิค",
        ],
        popular: false,
      },
    ],
  },

  contact: {
    eyebrow: "ติดต่อฉัน",
    title: "ยังมี",
    titleScript: "คำถามอยู่ไหม?",
    lede: "ฝากข้อมูลของคุณไว้ แล้วฉันจะติดต่อกลับโดยเร็วที่สุด ปรึกษาครั้งแรกฟรี",
    nameLabel: "ชื่อของคุณ",
    namePlaceholder: "ชื่อของคุณ",
    phoneLabel: "เบอร์โทรศัพท์",
    phonePlaceholder: "+66 __ ___ ____",
    goalLabel: "เป้าหมายของคุณ",
    goals: ["ลดน้ำหนัก", "เพิ่มกล้ามเนื้อ", "รักษาหุ่น", "โค้ชออนไลน์"],
    submit: "ส่งคำขอ",
    submitting: "กำลังส่ง…",
    note: "เราจะติดต่อกลับโดยเร็วที่สุด",
    qrCaption: "สแกนเพื่อแชทใน Line",
    successTitle: "ส่งคำขอแล้ว!",
    successText: "ขอบคุณค่ะ — ฉันจะติดต่อกลับโดยเร็วที่สุด",
    sendAnother: "ส่งคำขออีกครั้ง",
    errorText: "เกิดข้อผิดพลาดในการส่งคำขอ กรุณาทักมาโดยตรงแทน:",
    errorCta: "ทักผ่าน WhatsApp",
    message: (name: string, phone: string, goal: string) =>
      `สวัสดีค่ะ Mui! ฉันชื่อ ${name}\nเบอร์โทร: ${phone}\nเป้าหมาย: ${goal || "ไม่ระบุ"}`,
  },

  footer: {
    rights: `© ${new Date().getFullYear()} Mui Wong สงวนลิขสิทธิ์ทุกประการ`,
    whatsappLabel: "แชทผ่าน WhatsApp",
    instagramLabel: "ติดตามบน Instagram",
    lineLabel: "แชทผ่าน Line",
  },
};
