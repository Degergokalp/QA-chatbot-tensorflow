# QA-chatbot-tensorflow

This code defines a web-based user interface for interacting with a question-answering machine learning model. The model is loaded and initialized using the QnA Maker API provided by Microsoft.

The user interface consists of three input fields:

A text input field where the user can enter the context or passage in which to search for answers.

A text input field where the user can enter their question.

A button that triggers the model to search for and output answers to the user's question.

When the user clicks the "Go!" button, the code sends the context and question to the QnA Maker API, which returns one or more possible answers along with a confidence score for each answer. The code displays the top answer and confidence score to the user, and also stores all of the possible answers in a list.

The code also includes two additional buttons that allow the user to download the chat archive as a JSON file, and all the possible answers as a txt file.

Note that the code also includes functionality for loading the context from a text file, by allowing the user to select a file using the "Choose File" button.
