const my_joke = {
	value : "",
	id_joke : ""
}

const item = (joke) =>{
	return `<div class="accordion-item">
		<h2 class="accordion-header" id="heading-${joke.id_joke}">
			<button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${joke.id_joke}" aria-expanded="false" aria-controls="collapse-${joke.id_joke}">
				${joke.id_joke}
			</button>
		</h2>
		<div id="collapse-${joke.id_joke}" class="accordion-collapse collapse" aria-labelledby="heading${joke.id_joke}" data-bs-parent="#accordionExample">
			<div class="accordion-body">
				${joke.value}
			</div>
		</div>
	</div>`
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
					$("#list-jokes").prepend(item(joke))
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
			$("#list-jokes").prepend(item(my_joke))
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
