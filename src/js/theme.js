if (!localStorage.theme) localStorage.theme = "light" 
document.body.className = localStorage.theme


toggleThemeBtn.onclick = () => {
    document.body.classList.toggle("dark")
    // localStorage.theme = document.body.className || "light"
    
   
}

let changeThemeButtons = document.querySelectorAll('.changeTheme');

changeThemeButtons.forEach(button => {
    button.addEventListener('click', function () {
        applyTheme(this.dataset.theme)
        // let theme = this.dataset.theme;
        // alert (theme)
        // applyTheme(theme);
        localStorage.setItem('theme', this.dataset.theme)
    });
});
function applyTheme(themeName) {
    
    changeThemeButtons.forEach(button => {
        button.style.display = 'block';
    
    });
    document.querySelector(`[data-theme="${themeName}"]`).style.display = 'none';
    localStorage.setItem('theme', themeName);
}


let activeTheme = localStorage.getItem('theme'); 

if(activeTheme === null || activeTheme === 'light') { 
    applyTheme('light');
} else if (activeTheme === 'dark') { 
    applyTheme('dark');
}