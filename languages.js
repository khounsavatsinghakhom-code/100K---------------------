const TRANSLATIONS = {
    lo: {
        "hero-title": "ສູນລວມຊ່າງມືອາຊີບ<br>ໃກ້ບ້ານທ່ານ",
        "hero-sub": "ເອີ້ນຊ່າງກວດເຊັກທຸກອາການ ເລີ່ມຕົ້ນພຽງ 100,000 ກີບ! ໂປ່ງໃສ ບໍ່ຟັນລາຄາ ໝັ້ນໃຈໄດ້ 100%",
        "btn-book-nav": "📅 ເລືອກເວລານັດໝາຍ",
        "btn-receipt-nav": "🧾 ໃບສະຫຼຸບງານຊ່າງ",
        "btn-staff-top": "🧾 ອອກໃບເຊັດ (ສຳລັບຊ່າງ)",
        "section-services": "🛠 ໝວດໝູ່ບໍລິການ ແລະ ຄ່າແຮງມາດຕະຖານ",
        "section-services-sub": "ລາຄາໂປ່ງໃສ ມາດຕະຖານດຽວກັນທົ່ວຮ້ານ",
        "section-booking": "📅 ນັດໝາຍວັນ-ເວລາ ທີ່ທ່ານສະດວກ",
        "section-booking-sub": "🔔 ທີມງານຈະຕິດຕໍ່ຢືນຢັນຄິວທຸກໆ 2 ມື້ (ຫຼັງເວລາ 16:00 ນ້ຳ ເປັນຕົ້ນໄປ)",
        "lbl-service": "ເລືອກບໍລິການ:",
        "lbl-date": "ເລືອກວັນທີ:",
        "lbl-time": "ເລືອກຊ່ວງເວລາ:",
        "opt-morning": "🌅 ຕອນເຊົ້າ (09:00 - 12:00)",
        "opt-afternoon": "☀️ ຕອນບ່າຍ (13:00 - 17:00)",
        "btn-confirm-book": "✅ ຢືນຢັນການນັດໝາຍຊ່າງ",
        "terms-title": "⚠️ ເງື່ອນໄຂການຮັບປະກັນ",
        "terms-1": "ງານບໍລິການ ແລະ ງານຕິດຕັ້ງທຸກປະເພດ ມີການຮັບປະກັນລະບົບຫຼັງການຊ່ວຍເຫຼືອ 15 ວັນ.",
        "terms-2": "ຫາກລູກຄ້າຕັດສິນໃຈບໍ່ແປງຫຼັງຈາກຊ່າງແຈ້ງອາການ, ລູກຄ້າຈະຈ່າຍພຽງຄ່າກວດເຊັກພື້ນຖານ 100,000 ກີບ."
    },
    en: {
        "hero-title": "Professional Handyman<br>Center Near You",
        "hero-sub": "Call a technician for inspection starting at only 100,000 Kip! Transparent pricing, 100% confidence guaranteed.",
        "btn-book-nav": "📅 Book a Service",
        "btn-receipt-nav": "🧾 Technician Summary",
        "btn-staff-top": "🧾 Issue Receipt (Staff Only)",
        "section-services": "🛠 Service Categories & Standard Labor Fees",
        "section-services-sub": "Transparent pricing, same standard across the shop",
        "section-booking": "📅 Book Your Convenient Date & Time",
        "section-booking-sub": "🔔 Our team will contact you to confirm within 2 days (after 16:00 PM onwards)",
        "lbl-service": "Select Service:",
        "lbl-date": "Select Date:",
        "lbl-time": "Select Time Slot:",
        "opt-morning": "🌅 Morning (09:00 AM - 12:00 PM)",
        "opt-afternoon": "☀️ Afternoon (01:00 PM - 05:00 PM)",
        "btn-confirm-book": "✅ Confirm Booking",
        "terms-title": "⚠️ Warranty Terms & Conditions",
        "terms-1": "All types of services and installations come with a 15-day service warranty.",
        "terms-2": "If the customer decides not to repair after inspection, a basic fee of 100,000 Kip applies."
    }
};

let currentLang = "lo";

function switchLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    
    Object.keys(TRANSLATIONS[lang]).forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = TRANSLATIONS[lang][id];
        }
    });
    
    if (typeof renderServices === "function") {
        renderServices();
    }
}