// app.js
document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. ORDER FORM LOGIC (For order.html)
    // ==========================================
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    
    if (step1 && step2 && nextBtn && backBtn) {
        nextBtn.addEventListener('click', () => {
            step1.classList.remove('opacity-100');
            step1.classList.add('opacity-0');
            setTimeout(() => {
                step1.classList.add('hidden');
                step1.classList.remove('block');
                step2.classList.remove('hidden');
                step2.classList.add('block');
                void step2.offsetWidth; 
                step2.classList.remove('opacity-0');
                step2.classList.add('opacity-100');
            }, 300); 
        });

        backBtn.addEventListener('click', () => {
            step2.classList.remove('opacity-100');
            step2.classList.add('opacity-0');
            setTimeout(() => {
                step2.classList.add('hidden');
                step2.classList.remove('block');
                step1.classList.remove('hidden');
                step1.classList.add('block');
                void step1.offsetWidth;
                step1.classList.remove('opacity-0');
                step1.classList.add('opacity-100');
            }, 300);
        });

        function buildMessage() {
            const eventType = document.getElementById('eventType').value;
            const eventDate = document.getElementById('eventDate').value || 'Not specified';
            const designVision = document.getElementById('designVision').value || 'No specific details provided.';
            const fulfillment = document.getElementById('fulfillment').value;
            
            const productCheckboxes = document.querySelectorAll('.product-type:checked');
            const products = Array.from(productCheckboxes).map(cb => cb.value).join(', ') || 'No products selected';

            const text = `👋 Hello Casmash Pastry! I would like to request a quote for an upcoming event:\n\n` +
                         `*Event Type:* ${eventType}\n` +
                         `*Date:* ${eventDate}\n` +
                         `*Products Needed:* ${products}\n` +
                         `*Fulfillment:* ${fulfillment}\n\n` +
                         `*Design Vision & Details:*\n${designVision}`;

            return encodeURIComponent(text);
        }

        document.getElementById('submitTelegram').addEventListener('click', (e) => {
            e.preventDefault();
            const message = buildMessage();
            window.open(`https://t.me/${CasmashContact.telegram}?text=${message}`, '_blank');
        });

        document.getElementById('submitWhatsApp').addEventListener('click', (e) => {
            e.preventDefault();
            const message = buildMessage();
            window.open(`https://wa.me/${CasmashContact.whatsapp}?text=${message}`, '_blank');
        });
    }


    // ==========================================
    // 2. GALLERY FILTER LOGIC (For gallery.html)
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 1. Reset all buttons to the "inactive" white style
                filterBtns.forEach(b => {
                    b.classList.remove('bg-berry', 'text-white');
                    b.classList.add('bg-white', 'text-choco');
                });
                
                // 2. Set the clicked button to the "active" pink style
                btn.classList.remove('bg-white', 'text-choco');
                btn.classList.add('bg-berry', 'text-white');

                // 3. Get the category we want to filter by
                const filterValue = btn.getAttribute('data-filter');

                // 4. Loop through images and show/hide them based on category
                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    
                    if (filterValue === 'all' || itemCategory === filterValue) {
                        item.classList.remove('hidden');
                        item.classList.add('flex');
                    } else {
                        item.classList.remove('flex');
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }
});
