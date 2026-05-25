function renderServices() {
    let gridHtml = '';
    let selectHtml = '';
    let checkboxHtml = '';
    
    const ALL_MODULES = [AIR_SERVICES, ELECTRIC_SERVICES, PLUMBING_SERVICES];
    
    ALL_MODULES.forEach(category => {
        let title = (currentLang === "lo") ? category.title_lo : category.title_en;
        
        gridHtml += `<div class="card"><h3>${title}</h3><div class="price-list">`;
        
        category.items.forEach(item => {
            let name = (currentLang === "lo") ? item.name : item.en_name;
            let btnText = (currentLang === "lo") ? "📞 ທັກຫາຊ່າງ" : "📞 Contact";
            
            // ປ່ຽນການສະແດງຜົນໃຫ້ມີປຸ່ມກົດແຍກລາຍການແບບ Fastwork
            gridHtml += `
                <div class="service-item-row">
                    <div class="item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-price">${item.price.toLocaleString()} ກີບ</span>
                    </div>
                    <button class="btn-order-item" onclick="directOrder('${name}')">${btnText}</button>
                </div>`;
                
            selectHtml += `<option value="${name}">${name}</option>`;
            checkboxHtml += `<label style="display:flex; align-items:center; margin:12px 0; font-size:14.5px; cursor:pointer; color:#1E293B;">
                <input type="checkbox" class="job-checkbox" data-name="${name}" value="${item.price}" onchange="calculateTotal()"> ${name} (${item.price.toLocaleString()} ກີບ)
            </label>`;
        });
        gridHtml += `</div></div>`;
    });
    
    document.getElementById('services-display-grid').innerHTML = gridHtml;
    document.getElementById('book-service').innerHTML = selectHtml;
    document.getElementById('receipt-checkboxes-zone').innerHTML = checkboxHtml;
    calculateTotal();
}

// 🚀 ຟັງຊັນພິເສດ: ກົດປຸ່ມແລ້ວເດັ້ງເຂົ້າ WhatsApp ພ້ອມຊື່ລາຍການບໍລິການທັນທີ
function directOrder(serviceName) {
    const whatsappNumber = "85620XXXXXXXX"; // ⚠️ ປ່ຽນ XXXXXXXX ເປັນເບີ WhatsApp ຂອງເຈົ້າ
    const text = `ສະບາຍດີ 100K ຊ່າງປະຈຳບ້ານ, ຂ້ອຍສົນໃຈບໍລິການ:\n👉 ${serviceName}\n\nກະລຸນາແນະນຳຄິວຊ່າງໃຫ້ແດ່ເດີ້.`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
}