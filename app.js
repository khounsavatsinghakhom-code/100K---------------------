const STAFF_PIN = "100K2026";

window.onload = function() {
    renderServices();
    initCurrentDate();
};

function renderServices() {
    let gridHtml = '';
    let selectHtml = '';
    let checkboxHtml = '';
    
    for (let cat in SERVICES_DATA) {
        let category = SERVICES_DATA[cat];
        gridHtml += `<div class="card"><h3>${category.title}</h3><ul class="price-list">`;
        
        category.items.forEach(item => {
            gridHtml += `<li><span>${item.name}</span><span style="font-weight:500;">${item.price.toLocaleString()} ກີບ</span></li>`;
            selectHtml += `<option value="${item.name}">${item.name}</option>`;
            checkboxHtml += `<label style="display:flex; align-items:center; margin:14px 0; font-size:14.5px; cursor:pointer; color:#1E293B;">
                <input type="checkbox" class="job-checkbox" data-name="${item.name}" value="${item.price}" onchange="calculateTotal()"> ${item.name} (${item.price.toLocaleString()} ກີບ)
            </label>`;
        });
        gridHtml += `</ul></div>`;
    }
    
    document.getElementById('services-display-grid').innerHTML = gridHtml;
    document.getElementById('book-service').innerHTML = selectHtml;
    document.getElementById('receipt-checkboxes-zone').innerHTML = checkboxHtml;
    calculateTotal();
}

function initCurrentDate() {
    const today = new Date();
    document.getElementById('rec-date').innerText = String(today.getDate()).padStart(2, '0') + '/' + String(today.getMonth() + 1).padStart(2, '0') + '/' + today.getFullYear();
}

function checkStaffLogin() {
    let pass = prompt("🔒 ກະລຸນາປ້ອນລະຫັດຜ່ານພະນັກງານຊ່າງ:");
    if (pass === STAFF_PIN) {
        document.getElementById('staff-only-section').style.display = 'block';
        document.getElementById('receipt').scrollIntoView({ behavior: 'smooth' });
    } else if (pass !== null) {
        alert("❌ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ!");
    }
}

function updateReceiptData() {
    document.getElementById('rec-name').innerText = document.getElementById('cust-name').value || '---------';
    document.getElementById('rec-phone').innerText = document.getElementById('cust-phone').value || '---------';
}

function calculateTotal() {
    let total = 0;
    let itemsHtml = '';
    let checkboxes = document.querySelectorAll('.job-checkbox');
    
    checkboxes.forEach(cb => {
        if(cb.checked) {
            total += parseInt(cb.value);
            itemsHtml += `<div class="receipt-row"><span>🛠 ${cb.getAttribute('data-name')}</span><span style="font-weight:500;">${parseInt(cb.value).toLocaleString()} ກີບ</span></div>`;
        }
    });
    
    let spareCost = parseInt(document.getElementById('spare-cost').value) || 0;
    let spareDetail = document.getElementById('spare-detail').value || 'ຄ່າອະໄຫຼ່ເພີ່ມເຕີມ';
    
    if(spareCost > 0) {
        total += spareCost;
        itemsHtml += `<div class="receipt-row"><span style="color:#c62828;">⚙️ ອະໄຫຼ່: ${spareDetail}</span><span style="color:#c62828; font-weight:500;">${spareCost.toLocaleString()} ກີບ</span></div>`;
    }
    
    document.getElementById('receipt-items').innerHTML = itemsHtml || `<div class="receipt-row"><span style="color:#777;">ຍັງບໍ່ມີການເລືອກລາຍການ</span><span>0 ກີບ</span></div>`;
    document.getElementById('total-price-display').innerHTML = total.toLocaleString() + ' ກີບ';
}

function downloadReceiptImage() {
    html2canvas(document.getElementById('my-receipt-box'), { scale: 3, backgroundColor: "#0A0F1D" }).then(canvas => {
        const link = document.createElement('a');
        link.download = `ໃບຮັບເງິນ_100K_${document.getElementById('cust-name').value || 'ລູກຄ້າ'}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
}

function sendBooking() {
    const text = `ສະບາຍດີ 100K ຊ່າງປະຈຳບ້ານ, ຂ້ອຍຢາກນັດໝາຍຊ່າງ:\n\n🛠 ບໍລິການ: ${document.getElementById('book-service').value}\n📅 ວັນທີ: ${document.getElementById('book-date').value}\n⏰ ເວລາ: ${document.getElementById('book-time').value}`;
    window.open(`https://wa.me/85620XXXXXXXX?text=${encodeURIComponent(text)}`, '_blank'); // ⚠️ ປ່ຽນເປັນເບີເຈົ້າເດີ້
}