import pandas as pd
from fastapi import FastAPI, Form, HTTPException
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
from bs4 import BeautifulSoup
import requests

app = FastAPI()

# Load the pre-trained model and data
data = pd.read_csv('main_data.csv')
filename = 'nlp_model.pkl'
clf = pickle.load(open(filename, 'rb'))
vectorizer = pickle.load(open('tranform.pkl', 'rb'))

# Create count matrix
cv = CountVectorizer()
count_matrix = cv.fit_transform(data['comb'])
# Calculate cosine similarity
similarity = cosine_similarity(count_matrix)

def recommend(movie):
    movie = movie.lower()
    if movie not in data['movie_title'].unique():
        raise HTTPException(status_code=404, detail='Sorry! The movie you requested is not in our database. Please check the spelling or try with some other movies')
    else:
        i = data.loc[data['movie_title'] == movie].index[0]
        lst = list(enumerate(similarity[i]))
        lst = sorted(lst, key=lambda x: x[1], reverse=True)
        lst = lst[1:11]  # Exclude first item since it is the requested movie itself
        recommendations = [data['movie_title'][a] for (a, _) in lst]
        return recommendations


@app.get("/")
def index():
    return{"Final year project":"Movie Management System with content-based recommendation and Sentiment Analysis"}

@app.post("/recommendation")
async def recommendation(movie: str = Form(...)):
    try:
        rec_movies = recommend(movie)
        return {"recommendations": rec_movies}
    except HTTPException as e:
        return {"error": e.detail}

def analyze_sentiment(review):
    # Transform the review text using the pre-trained TF-IDF vectorizer
    review_vector = vectorizer.transform([review])
    # Predict the sentiment using the pre-trained model
    prediction = clf.predict(review_vector)
    # Return the sentiment prediction (0 for negative, 1 for positive)
    return 'Positive' if prediction[0] == 1 else 'Negative'

def scrape_movie_reviews(imdb_id):
    reviews_dict = {}
    # IMDb movie reviews URL
    url = f'https://www.imdb.com/title/{imdb_id}/reviews?ref_=tt_ov_rt'
    # Send HTTP GET request to fetch the webpage
    response = requests.get(url)
    if response.status_code == 200:
        # Parse the HTML content of the webpage
        soup = BeautifulSoup(response.text, 'html.parser')
        # Find all review elements
        review_elements = soup.find_all("div", {"class": "text show-more__control"})
        # Extract text from review elements and analyze sentiment
        for idx, element in enumerate(review_elements, start=1):
            review_text = element.get_text(strip=True)
            sentiment = analyze_sentiment(review_text)
            reviews_dict[f"Review {idx}"] = {"Text": review_text, "Sentiment": sentiment}
    return reviews_dict
@app.post("/sentiment")
# async def sentiment_analysis(review: str = Form(...)):
#     try:
#         sentiment = analyze_sentiment(review)
#         return {"sentiment": "Positive" if sentiment == 1 else "Negative"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))
async def reviews_sentiment(imdb_id: str = Form(...)):
    try:
        # Scrape movie reviews from IMDb and analyze sentiment
        reviews_with_sentiment = scrape_movie_reviews(imdb_id)
        # Return reviews with sentiment in a dictionary format
        return {"reviews_with_sentiment": reviews_with_sentiment}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
# run the api with uvicorn
if __name__=='__main__':
    uvicorn.run(app,host='127.0.0.1',port=8000)    