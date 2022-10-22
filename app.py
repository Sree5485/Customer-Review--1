# import the necessary modules
from flask import Flask , render_template , request , jsonify

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/predicted-emotions' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('text')

    # check if the customer_review is empty, return error
    if not review:
        return jsonify({'status' : 'error' , 
                        'message' : 'Empty response'})
    else:
        emotion,url= sa.predict(review)

        return jsonify({'status':'success' , 
            "data":{
                "predictedEmotion":emotion,
                "predictedEmotionImgUrl":url
            }})


if __name__  ==  "__main__":
    app.run(debug = True)