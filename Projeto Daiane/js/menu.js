// Classe Menu para gerenciar o comportamento do menu responsivo
class Menu {
    constructor(config) {
        this.nav = document.querySelector(config.container);
        this.btn = document.querySelector(config.toggleBtn);
        this.maxWidth = config.widthEnabled || false;
        this._opened = false;
        
        this.init();
    }
    
    // Inicializa os eventos e configurações
    init() {
        this.btn.removeAttribute('style');
        this.setupResizeListener();
        this.btn.addEventListener('click', () => this.toggleMenu());
        this.setupServiceLinkListener();
    }
    
    // Configura o evento de redimensionamento da tela
    setupResizeListener() {
        if (this.maxWidth) {
            window.addEventListener('resize', () => {
                if (window.innerWidth > this.maxWidth) {
                    this.nav.removeAttribute('style');
                    this._opened = true;
                } else if (!this.nav.getAttribute('style')) {
                    this.closeMenu();
                }
            });

            if (window.innerWidth <= this.maxWidth) {
                this.closeMenu();
            }
        }
    }
    
    // Abre ou fecha o menu ao clicar no botão
    toggleMenu() {
        this._opened ? this.closeMenu() : this.openMenu();
    }
    
    // Abre o menu
    openMenu() {
        const top = this.nav.getBoundingClientRect().top + 'px';
        this.applyStyleToNav({ maxHeight: `calc(100vh - ${top})`, overflow: 'hidden' });
        this._opened = true;
    }
    
    // Fecha o menu
    closeMenu() {
        this.applyStyleToNav({ maxHeight: '0px', overflow: 'hidden' });
        this._opened = false;
    }
    
    // Aplica estilos ao menu de navegação
    applyStyleToNav(styles) {
        Object.keys(styles).forEach(style => {
            this.nav.style[style] = styles[style];
        });
    }
    
    // Adiciona evento de clique ao link "Serviços"
    setupServiceLinkListener() {
        const servicosLink = document.getElementById('scrollLink');
        const fotosTitle = document.querySelector('.principal__text');
        
        servicosLink.addEventListener('click', event => {
            event.preventDefault();
            
            // Rola suavemente até a seção
            fotosTitle.scrollIntoView({ behavior: 'smooth' });
            
        // Fecha o menu apenas para celular
        if (window.innerWidth <= 1025) {
            this.closeMenu();
        }
        });
    }
}

// Inicializa o menu com as configurações necessárias
document.addEventListener('DOMContentLoaded', () => {
    new Menu({
        container: '.nav',
        toggleBtn: '.menu-btn',
        widthEnabled: 768
    });
});
