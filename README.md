# IEM-final-year-Project

<h1>Movie Recommendation System</h1>

This is a project for a movie recommendation system, developed using Python programming language. The project uses content based filtering algorithm to recommend movies to users based on their movie ratings and preferences.

<h2>Getting Started</h2>

1. Clone the repository: git clone https://github.com/your_username/movie-recommendation-system.git
2. Install the required dependencies: pip install -r requirements.txt
3. Prepare your movie data: The movie data should be in a CSV file, with columns user_id, movie_id, and rating. The user_id and movie_id columns should contain unique identifiers for each user and movie, respectively. The rating column should contain the user's rating for each movie, on a scale of 1 to 5. Place this file in the data folder.
4. Train the model: Run python train.py to train the model using the movie data.
5. Get recommendations: Run python recommend.py and enter a user ID to get a list of recommended movies for that user.

<h2>Files and Directories</h2>

1. data/: Directory containing the movie data in a CSV format.
2. models/: Directory containing the trained models for the movie recommendation system.
3. train.py: Python script to train the movie recommendation system.
4. recommend.py: Python script to get recommendations for a user.
5. requirements.txt: List of required dependencies.

