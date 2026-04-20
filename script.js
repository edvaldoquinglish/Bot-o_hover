// Função para aplicar estilos personalizados
function applyCustomStyles() {
    const btnColor = document.getElementById('btn-color').value;
    const textColor = document.getElementById('text-color').value;
    
    // Aplica aos botões básicos
    const basicButtons = document.querySelectorAll('.btn-1, .btn-2, .btn-3');
    basicButtons.forEach(btn => {
        btn.style.backgroundColor = btnColor;
        btn.style.color = textColor;
    });
    
    // Feedback visual
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #2ecc71;
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    feedback.textContent = 'Estilos aplicados!';
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 2000);
}

// Adiciona estilo para a animação de slideIn
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Efeito de ripple para todos os botões
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Remove ripple anterior se existir
            const existingRipple = this.querySelector('.ripple');
            if (existingRipple) {
                existingRipple.remove();
            }
            
            // Cria novo ripple
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Posiciona o ripple
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remove o ripple após a animação
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Adiciona keyframes para o ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// Demo: Mostra informações do botão quando hover
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn');
    const infoPanel = document.createElement('div');
    infoPanel.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 0.9rem;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
    `;
    document.body.appendChild(infoPanel);
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const className = this.className.split(' ')[1];
            const effectName = getEffectName(className);
            infoPanel.textContent = `Efeito: ${effectName}`;
            infoPanel.style.opacity = '1';
        });
        
        button.addEventListener('mouseleave', function() {
            infoPanel.style.opacity = '0';
        });
    });
    
    function getEffectName(className) {
        const effects = {
            'btn-1': 'Hover Simples',
            'btn-2': 'Elevação',
            'btn-3': 'Mudança de Cor',
            'btn-4': 'Borda Animada',
            'btn-5': 'Preenchimento',
            'btn-6': 'Ícone Flutuante',
            'btn-7': 'Sliding Background',
            'btn-8': 'Pulse Effect',
            'btn-9': '3D Press'
        };
        return effects[className] || 'Efeito Desconhecido';
    }
});