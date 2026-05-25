window.onload = function() {
    const today = new Date().toISOString().split('T')[0];
    if(document.getElementById('book-date')) {
        document.getElementById('book-date').value = today;
    }
    renderServices();
};

// ⚠️ ປ່ຽນເບີ WhatsApp ຂອງເຈົ້າຢູ່ກົງນີ້ໄດ້ເລີຍເຈົ້າ (ໃສ່ 85620 ນຳໜ້າ)
const MY_WHATSAPP_NUMBER = "8562076689978"; 

function renderServices() {
    let gridHtml = '';
    let selectHtml = '';
    let checkboxHtml = '';
    
    const ALL_MODULES = [AIR_SERVICES, ELECTRIC_SERVICES, PLUMBING_SERVICES];
    
    ALL_MODULES.forEach(category => {
        let title = category.title_lo;
        gridHtml += `<div class="card"><h3>${title}</h3><div class="price-list">`;
        
        category.items.forEach(item => {
            let name = item.name;
            
            gridHtml += `
                <div class="service-item-row">
                    <div class="item-info">
                        <span class="item-name">${name}</span>
                        <span class="item-price">${item.price.toLocaleString()} ກີບ</span>
                    </div>
                    <button class="btn-order-item" onclick="directOrder('${name}')">📞 ທັກຫາຊ່າງ</button>
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

function directOrder(serviceName) {
    const text = `ສະບາຍດີ 100K ຊ່າງປະຈຳບ້ານ, ຂ້ອຍສົນໃຈບໍລິການ:\n👉 ${serviceName}\n\nກະລຸນາແນະນຳຄິວຊ່າງໃຫ້ແດ່ເດີ້.`;
    window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

function calculateTotal() {
    let totalLabor = 0;
    let itemsHtml = '';
    
    const checkboxes = document.querySelectorAll('.job-checkbox:checked');
    checkboxes.forEach(cb => {
        totalLabor += parseInt(cb.value);
        itemsHtml += `<div class="receipt-row"><span>✔️ ${cb.getAttribute('data-name')}</span><span>${parseInt(cb.value).toLocaleString()} ກີບ</span></div>`;
    });
    
    const spareCost = parseInt(document.getElementById('spare-cost').value) || 0;
    const spareDetail = document.getElementById('spare-detail').value || 'ຄ່າອະໄຫຼ່ເພີ່ມເຕີມ';
    
    if(spareCost > 0) {
        itemsHtml += `<div class="receipt-row" style="color:#d32f2f;"><span>⚙️ ${spareDetail}</span><span>${spareCost.toLocaleString()} ກີບ</span></div>`;
    }
    
    const finalTotal = totalLabor + spareCost;
    document.getElementById('receipt-items').innerHTML = itemsHtml || '<div style="text-align:center; color:#999; padding:20px;">ບໍ່ມີລາຍການຖືກເລືອກ</div>';
    document.getElementById('total-price-display').innerHTML = finalTotal.toLocaleString() + " ກີບ";
}

function updateReceiptData() {
    document.getElementById('rec-name').innerText = document.getElementById('cust-name').value || '---------';
    document.getElementById('rec-phone').innerText = document.getElementById('cust-phone').value || '---------';
    
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    document.getElementById('rec-date').innerText = `${dd}/${mm}/${yyyy}`;
}

function checkStaffLogin() {
    const pin = prompt("ກະລຸນາປ້ອນລະຫັດ PIN ຂອງຊ່າງເພື່ອເຂົ້າໃຊ້ງານ:");
    if (pin === "100K2026") {
        document.getElementById('staff-only-section').style.display = 'block';
        document.getElementById('receipt').scrollIntoView({ behavior: 'smooth' });
        updateReceiptData();
    } else {
        alert("ລະຫັດ PIN ບໍ່ຖືກຕ້ອງ! ສະເພາະທີມຊ່າງ 100K ເທົ່ານັ້ນ.");
    }
}

function sendBooking() {
    const service = document.getElementById('book-service').value;
    const date = document.getElementById('book-date').value;
    const time = document.getElementById('book-time').value;
    if(!date) { alert('ກະລຸນາເລືອກວັນທີ!'); return; }
    const text = `📅 ຂໍ້ຄວາມແຈ້ງຈອງຄິວຊ່າງລ່ວງໜ້າ:\n🛠 ບໍລິການ: ${service}\n📆 ວັນທີ: ${date}\n⏰ ຊ່ວງເວລາ: ${time}`;
    window.open(`https://wa.me/${MY_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank');
}

function downloadReceiptImage() {
    const zone = document.getElementById('my-receipt-box');
    html2canvas(zone, { scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `100K-Receipt-${document.getElementById('cust-name').value || 'Customer'}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}