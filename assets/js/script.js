


// 1. دالة التحكم بالكمية - تعمل بشكل مستقل فور الضغط
function changeQty(id, delta) {
    const input = document.getElementById('qty-' + id);
    if (input) {
        let currentValue = parseInt(input.value) || 0;
        let newValue = currentValue + delta;
        if (newValue >= 0) {
            input.value = newValue;
        }
    }
}

// 2. دالة إرسال الطلب الفعلي للواتساب
function sendToWhatsApp() {
    const name = document.getElementById('customerName').value;
    const center = document.getElementById('centerName').value;
    const address = document.getElementById('address').value;

    if (!name || !address) {
        alert("يرجى ملء الاسم والعنوان أولاً");
        return;
    }

    let productDetails = "";
    let hasItems = false;
    
    // يجمع كل كروت المنتجات
    const products = document.querySelectorAll('.product-card');

    products.forEach(p => {
        const id = p.getAttribute('data-id');
        const qtyInput = document.getElementById('qty-' + id);
        
        if (qtyInput && parseInt(qtyInput.value) > 0) {
            const productName = p.getAttribute('data-name');
            productDetails += `*${productName}* -> الكمية: (${qtyInput.value})\n`;
            hasItems = true;
        }
    });

    if (!hasItems) {
        alert("يرجى اختيار منتج واحد على الأقل");
        return;
    }

    const companyNumber = "963994914238"; // رقم شركة سنتوزا
    const message = `*طلب جملة جديد - شركة سنتوزا*\n` +
                    `--------------------------\n` +
                    `👤 *العميل:* ${name}\n` +
                    `🏬 *المركز:* ${center}\n` +
                    `📍 *العنوان:* ${address}\n` +
                    `--------------------------\n` +
                    `📦 *الطلبية:*\n${productDetails}\n` +
                    `--------------------------\n`;

    const whatsappURL = `https://wa.me/${companyNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}







