// app.js
document.addEventListener('DOMContentLoaded', () => {
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const nextBtn = document.getElementById('nextBtn');
    const backBtn = document.getElementById('backBtn');
    
    // Ensure we are on the page with the form
    if (step1 && step2 && nextBtn && backBtn) {
        
        // Navigation Logic
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

        // Message Builder Logic
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

        // Submission Logic - Telegram
        document.getElementById('submitTelegram').addEventListener('click', (e) => {
            e.preventDefault();
            const message = buildMessage();
            window.open(`https://t.me/${CasmashContact.telegram}?text=${message}`, '_blank');
        });

        // Submission Logic - WhatsApp
        document.getElementById('submitWhatsApp').addEventListener('click', (e) => {
            e.preventDefault();
            const message = buildMessage();
            window.open(`https://wa.me/${CasmashContact.whatsapp}?text=${message}`, '_blank');
        });
    }
});