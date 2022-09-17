$("#form-login").on('submit', (e) => {
    e.preventDefault();
    $.ajax({
        url : $("#form-login").attr('action'),
        type : $("#form-login").attr('method'),
        data : $("#form-login").serializeArray(),

        beforeSend: () =>{
            $('#btn-login').addClass('disabled')
            $('#loading').removeClass('visually-hidden')
            $('#alert').addClass('visually-hidden')

        },

        success: (response)=>{
            localStorage.setItem("token",response['token'])
            window.location.href = '/jokes/';
            $('#link-logout').empty().append()

        },
        error: (response) => {
            $('#btn-login').removeClass('disabled')
            $('#loading').addClass('visually-hidden')
            $('#alert').removeClass('visually-hidden')
        }
    })

})

// $('#form-register').on('submit', (e) => {
//     e.preventDefault();
//     $.ajax({
//         url : $('#form-register').attr('action'),
//         type : $('#form-register').attr('method'),
//         data : $('#form-register').serializeArray(),
//         success : (response) => {
//             console.log(response)
//         }
//     })
// })

