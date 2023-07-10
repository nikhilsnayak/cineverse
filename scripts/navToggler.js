

export function navToggler () {
const navbar = document.querySelector('nav');
const navToggle = document.getElementById('nav-toggle');

navToggle.addEventListener('click', ()=>{
    const visiblity = navbar.getAttribute('data-visible');

    if(visiblity === 'false'){
        navbar.setAttribute('data-visible', true);
        navToggle.setAttribute('data-toggled', true);
    }else{
        navbar.setAttribute('data-visible', false);
        navToggle.setAttribute('data-toggled', false);
    }
})
}