export default function hamburguerMenu (elementoDisparador, panelAfectado) {
    
    const d = document;
    
    d.addEventListener('click', e=>{
        if (e.target.matches(elementoDisparador)) {    
            e.preventDefault();
            d.querySelector(panelAfectado).classList.toggle('is-active');
               
        }

        if (e.target.matches('.categoria')) {   
            console.log(e.target.innerHTML); 
            d.querySelector(panelAfectado).classList.toggle('is-active');      
        } 

    })

}