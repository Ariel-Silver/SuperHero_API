// Iniciando Jquery
$(document).ready(function () {

    // Const que usaremos en el formulario
    const formularioElement = $("#formulario");
    const inputElement = $("#heroInput");
   
    console.log(formularioElement);
    
    //Función encargada de buscar y mostrar error
    formularioElement.submit(function(event) {
        event.preventDefault();
        
        const superHeroId = inputElement.val();

        if(superHeroId <=0 || superHeroId >= 732) {
            $("#error").html("<p class='inputIdError'>Error: Debes ingresar un número entre 1 y 731</p>");
        } else {
            $("#error").html("<p class='inputIdError'></p>");
        }

        //Integrando la api con un access token
        $.ajax ({
            type: "GET",
            url: `https://superheroapi.com/api.php/2350683071728481/${superHeroId}`,
            dataType: "json",
        })      
        
        // Función para traer la información de la api a nuestro HTML mas el grafico de torta de canvasjs
            .done (function (data) {
                console.log(data);
                
                const options = {
                    title: {
                        text: `Stats for ${data.name}`,
                    },
                    data: [
                        {
                        type: "pie" ,
                        showInLegend: true,
                        toolTipContent: "{name}: <strong>{y}%</strong>",
		                indexLabel: "{name} - {y}%",
                        dataPoints: [
                           {y: `${data.powerstats.combat}`, name:"Combat"},
                           {y: `${data.powerstats.durability}`, name:"Durability"},
                           {y: `${data.powerstats.intelligence}`, name:"Intelligence"},
                           {y: `${data.powerstats.power}`, name:"Power"},
                           {y: `${data.powerstats.speed}`, name:"Speed"},
                           {y: `${data.powerstats.strength}`, name:"Strength"},
                        ],
                        },
                        ],
                };

                $("#chartContainer").CanvasJSChart(options);

                $("#superCardImg").attr("src", data.image.url);
                $("#heroName").html(data.name);
                $("#heroConections").html(`<p>Conections:</p> ${data.connections['group-affiliation']}`);
                $("#heroPublisher").html(`<p>Publisher:</p> ${data.biography.publisher}`);
                $("#heroOccupation").html(`<p>Occupation:</p> ${data.work.occupation}`);
                $("#heroFirstAppearance").html(`<p>First Appearance:</p> ${data.biography['first-appearance']}`);
                $("#heroHeight").html(`<p>Height:</p> ${data.appearance.height.join("    -    ")}`);
                $("#heroWeight").html(`<p>Weight:</p> ${data.appearance.weight.join("    -    ")}`);
                $("#heroAliases").html(`<p>Aliases:</p> ${data.biography.aliases.join(" / ")}`);

            })
            .fail( function() {

             console.log ("error");
              
              });
            
    })
});