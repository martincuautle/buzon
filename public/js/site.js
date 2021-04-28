


var btnevidencia     = $('#addevidencia');
//var btnsubir     = $('#form-submit');


// ===== Codigo de la aplicación





btnevidencia.on('click', (event) => {
    event.preventDefault();
    
    var elementos = document.getElementsByClassName("listpruebas");
    console.log(elementos.length);
        for (var i = 0; i < elementos.length; i++) {
            elementos[i].addEventListener("click", newinput, false);
        }   
    let img = document.createElement("input");
    img.type = "file";
    img.name = "multi-files";
    img.class = "listpruebas";
    img.id = "evidencia"+(elementos.length+1);
    img.accept = ".doc,.docx,.pdf,.png,.jpg,jpeg,video/*";   
    //img.alt = "Logo Javascript";
    let caja=document.querySelector("#contenedor");
    caja.insertAdjacentElement("afterbegin", img);
   

});
function newinput(){
    console.log("nuevo");
}
/*btnsubir.on('click', () => {
   
    let timerInterval
        Swal.fire({
        title: 'Subiendo Archivos',
        html: 'Espere un momento',
        timer: 86400000,
        timerProgressBar: false,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            const content = Swal.getContent()
            if (content) {
                const b = content.querySelector('b')
                if (b) {
                b.textContent = Swal.getTimerLeft()
                }
            }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        //Read more about handling dismissals below 
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('Error')
        }
        })
});*/

// Obtener municipios del servidor
function getMun() {

    fetch('/api/mun')
        .then( res => res.json() )
        .then( posts => {

            let initmun="<option value='' disabled selected hidden>-Elije un Municipio-</option>";
            initmun+=posts;
            document.getElementById("municipio").innerHTML=initmun;
            $('#municipio').change(function() {
                console.log("cambio"); 
                let mun=document.getElementById("municipio").value; 
                if(mun==""){
                    document.getElementById("colonia").innerHTML="<option value='' disabled selected hidden>-Elije una localidad-</option>";
                    return false;
                }
                var data = {
                    municipio: mun,           
                };  
                console.log(data);
                fetch('api/localidades', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify( data )
                })
                .then( res => res.json() )
                .then( res =>{
                    let initmun="<option value='' disabled selected hidden>-Elije una localidad-</option>";
                    initmun+=res;
                    document.getElementById("colonia").innerHTML=initmun;
                })
                .catch( err => {
                    document.getElementById("colonia").innerHTML="<option value='' disabled selected hidden>-Elije una localidad-</option>";
                    console.log( 'app.js error:', err );
                });
            });
        })
        .catch( err => {
            document.getElementById("municipio").innerHTML="<option value='' disabled selected hidden>-Elije un Municipio-</option>";
        });


}

getMun();
