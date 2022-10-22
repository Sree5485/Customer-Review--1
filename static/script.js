var date=new Date()
let display_date="Date:"+date.toLocaleDateString()



$(document).ready(function(){

    console.log('Ready')

    //  Fetch the current date and update it in the DOM
    $(document).ready(function(){
        $("#date").html(display_date)
    })



    //  write an event, when Submit button is clicked
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'text' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({
            //  type of web request
            type : 'POST',
            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),
            //  type of response expected is json
            dataType : 'json',
            url:"/predicted-emotions",
            //  contentType
            contentType : 'application/json',
            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                predicted_emotion=result.data.predictedEmotion
                predicted_emotion_img_url=result.data.predictedEmotionImgUrl
                // Display Result Using JavaScript----->HTML
                $("#sentiment").html(predicted_emotion)
                $("#sentiment").show()


                $("#emoji").attr("src",predicted_emotion_img_url)
                $("#emoji").show()

                //  update the DOM elements


                //  show them

            },

            //  if any error, run this function
            error : function(result){

                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
        
})