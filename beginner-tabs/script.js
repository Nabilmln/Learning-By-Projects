const tabs = document.querySelectorAll('.tab');
const contents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click',function() {
        tabs.forEach(t => {
            t.classList.remove('active');
        });
        contents.forEach(content => {
            content.classList.remove('active');
        });
        
        this.classList.add('active');
        const id = this.getAttribute('data-id');
        document.getElementById(id).classList.add('active');    
     });   
});