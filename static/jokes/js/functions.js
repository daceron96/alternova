const my_joke = {
    value : "",
    id_joke : ""
}

const item = (value) =>{
    return `<li class='list-group-item d-flex justify-content-between align-items-start align-middle'>
        <div class='ms-2 me-auto'> 
        ${value}
        </div>
    </li>`
    
}

const link = () =>{
    return `<a class=" btn btn-warning px-5 text-white fw-semibolder" aria-current="page" id="btn-logout"
    onclick='logout()'>Sign out</a>`
}

function getCSRFToken() {
    let cookieValue = null;
    if (document.cookie && document.cookie != '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, 10) == ('csrftoken' + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(10));
                break;
            }
        }
    }
    return cookieValue;
}

function joke_style(joke){
    $('#joke-text').text(joke.value)
    $('#joke-id').text( joke.id)
    $("#status").addClass('visually-hidden')
    $("#card").removeClass('visually-hidden')
    $('#btn-get-joke').removeClass('disabled')
    my_joke.value = joke.value
    my_joke.id_joke = joke.id
}

$(document).ready(() => {
    
    if(localStorage.token){
        $.ajax({
            url : "list-jokes/",
            type : "GET",
            headers: {
                "jwt": localStorage.token,
            },
            success: (response) => {
                joke_style(response.joke)
                $('#link-logout').empty().append(link)
                $('#loading-group').addClass('visually-hidden')
                $('#content').removeClass('visually-hidden')
                $('#registered-mail').text(response.email)
                response.data.forEach(joke => {
                    $("#list-jokes").prepend(item(joke.value))
                });
            },
            error : (response) => {
                $('#loading-group').addClass('visually-hidden')
                $('#alert-session').removeClass("visually-hidden").text(response.responseJSON.error)

            }
        })
    }else{
        $('#alert-session').removeClass("visually-hidden")
        $('#loading-group').addClass('visually-hidden')

    }


})


function get_joke(){
    $.ajax({
        
        url : "get-joke/",
        type : "POST",
        data : {
            token : localStorage.token,
            csrfmiddlewaretoken : getCSRFToken()
        },
        headers: {
            "jwt": localStorage.token,
        },
        beforeSend: () => {
            $("#status").removeClass('visually-hidden')
            $("#card").addClass('visually-hidden')
            $('#alert').addClass("visually-hidden")
            $('#btn-get-joke').addClass('disabled')
            
        },
        success : (response) =>{
            joke_style(response)
        },
        error : (response) => {
            $('#alert').removeClass("visually-hidden").text(response.responseJSON.error)
            $('#btn-get-joke').removeClass('disabled')
            $("#status").addClass('visually-hidden')
        }
        
    })

}


function create_joke(){
    
    $.ajax({
        url : 'create-joke/',
        type : 'POST',
        data : {
            value : my_joke.value,
            id_joke : my_joke.id_joke,
            csrfmiddlewaretoken: getCSRFToken()
        }, 
        headers: {
            "jwt": localStorage.token,
        },
        beforeSend : () =>{
            $('#loading').removeClass("visually-hidden")
            $('#btn-save').addClass("disabled")
            $('#alert').addClass("visually-hidden")


        },
        success : (response) => {
            $("#list-jokes").prepend(item(my_joke.value))
            $('#loading').addClass("visually-hidden")
            $('#btn-save').removeClass("disabled")
            $('#alert').removeClass("visually-hidden alert-danger").
                addClass("alert-success").
                text(response.message)

        },
        error : (response) => {
            $('#loading').addClass("visually-hidden")
            $('#alert').removeClass("visually-hidden alert-success").
                addClass('alert-danger')
                .text(response.responseJSON.message)
            $('#btn-save').removeClass("disabled")

        }
    })
}

function logout(){
    window.location.href = '/';
    localStorage.removeItem('token')
}
