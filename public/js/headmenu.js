[...document.querySelectorAll('.nav-items')].forEach(el=>{
    el.addEventListener('click', event=>{
        const target = event.target;
        const route = target.getAttribute('route');
        location.pathname = route;
    })
})