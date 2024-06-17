var stompClient=null

  function sendMessage(){
	
	let jsonOb ={
    name:localStorage.getItem("name"),
    content:$("#message-value").val()
  }

  stompClient.send("/app/message",{},JSON.stringify(jsonOb));
  }

function connect(){

     let socket=new SockJS("/server1")

     stompClient = Stomp.over(socket)

     stompClient.connect({},function(frame){
        console.log("Connected : " + frame)

       $("#name-form").addClass('d-none')
       $("#chat-room").removeClass('d-none')


       //subscribe

       stompClient.subsribe("topic/return-to",function(response){
        showMessage(JSON.parse(response.body))

       })




     })
}

function showMessage(message){
    $("#message-container-table").prepend('<tr><td><b>${message.name} :</br> ${message.content}</td></tr>')
 }



$(document).ready((e)=>
{
    
    $("#login").click(()=>
    {
        let name=$("name-value").val()
        localStorage.setItem("name",name);

        $("name-title").html('Welcome ,<b>$(name) </b>')
        connect()
    })



    
    $("#send-btn").click(()=>{
		sendMessage()
	})


  $("#logout").click(()=>{
    localStorage.removeItem("name")
    if(stompClient!==null){
      stompClient.disconnect()

      $("#name-form").removeClass('d-none')
      $("#chat-room").addClass('d-none')
    }
  })

})